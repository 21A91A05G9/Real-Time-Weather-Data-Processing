from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StringType, FloatType, LongType

# Create Spark session
spark = SparkSession.builder \
    .appName("WeatherDataProcessor") \
    .getOrCreate()

# Define schema for incoming weather data
schema = StructType() \
    .add("city", StringType()) \
    .add("main", StringType()) \
    .add("temp", FloatType()) \
    .add("feels_like", FloatType()) \
    .add("dt", LongType())

# Read data from Kafka
weather_data = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "weather_updates") \
    .load()

# Parse JSON messages from Kafka
weather_data_parsed = weather_data.selectExpr("CAST(value AS STRING)") \
    .select(from_json(col("value"), schema).alias("data")) \
    .select("data.*")

# Write data to MongoDB
weather_data_parsed.writeStream \
    .format("mongo") \
    .option("uri", "mongodb://localhost:27017/weather.weatherSummaries") \
    .outputMode("append") \
    .start() \
    .awaitTermination()
