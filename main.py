from fastapi import FastAPI

app = FastAPI()


@app.get("/v1/pedestrians_count")
def erkundung(date: str = "21.04.2024"): #define a function that takes a name as a query parameter
    return f"Datum {date}!"
