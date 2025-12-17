from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

data= pd.read_csv(r"./src/Gesamtdatensatz.csv")



origins = ["http://localhost:5173", "http://localhost:5174"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)

def date_filter(date):
    data_filtered=pd.DataFrame()
    for hour in range (24):
        dataframe_hour= data[(data['timestamp'] == f"{date}T{hour:02d}:00:00Z")]
    
        location_name= "Bahnhofstrasse (Nord)"
    
        for i in range (2):
            maske=(dataframe_hour["location_name"] == location_name)

            ltr_label=dataframe_hour.loc[maske, "ltr_label"]  #.loc und .iloc werden gebraucht um wirklich auf den Wert zuzugreifen.
                                                                    #Ohne diese Tools wird eine Serie "Ausschnitt aus dem Dataframe gemacht"
                                                                    #Dieser hat den nicht den Datentyp str sonder object und denn kann man dann nicht weiterverwenden
            rtl_label=dataframe_hour.loc[maske, "rtl_label"]
            dataframe_hour.loc[maske, "ltr_label"]=rtl_label
            dataframe_hour.loc[maske, "rtl_label"]=ltr_label

            ltr_pedestrians_count = dataframe_hour.loc[maske, "ltr_pedestrians_count"]
            rtl_pedestrians_count = dataframe_hour.loc[maske, "rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "ltr_pedestrians_count"] = rtl_pedestrians_count
            dataframe_hour.loc[maske, "rtl_pedestrians_count"] = ltr_pedestrians_count

            adult_ltr_pedestrians_count = dataframe_hour.loc[maske, "adult_ltr_pedestrians_count"]
            adult_rtl_pedestrians_count = dataframe_hour.loc[maske, "adult_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "adult_ltr_pedestrians_count"] = adult_rtl_pedestrians_count
            dataframe_hour.loc[maske, "adult_rtl_pedestrians_count"] = adult_ltr_pedestrians_count

            child_ltr_pedestrians_count = dataframe_hour.loc[maske, "child_ltr_pedestrians_count"]
            child_rtl_pedestrians_count = dataframe_hour.loc[maske, "child_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "child_ltr_pedestrians_count"] = child_rtl_pedestrians_count
            dataframe_hour.loc[maske, "child_rtl_pedestrians_count"] = child_ltr_pedestrians_count

            zone_1_ltr_pedestrians_count = dataframe_hour.loc[maske, "zone_1_ltr_pedestrians_count"]
            zone_1_rtl_pedestrians_count = dataframe_hour.loc[maske, "zone_1_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "zone_1_ltr_pedestrians_count"] = zone_1_rtl_pedestrians_count
            dataframe_hour.loc[maske, "zone_1_rtl_pedestrians_count"] = zone_1_ltr_pedestrians_count

            zone_2_ltr_pedestrians_count = dataframe_hour.loc[maske, "zone_2_ltr_pedestrians_count"]
            zone_2_rtl_pedestrians_count = dataframe_hour.loc[maske, "zone_2_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "zone_2_ltr_pedestrians_count"] = zone_2_rtl_pedestrians_count
            dataframe_hour.loc[maske, "zone_2_rtl_pedestrians_count"] = zone_2_ltr_pedestrians_count

            zone_3_ltr_pedestrians_count = dataframe_hour.loc[maske, "zone_3_ltr_pedestrians_count"]
            zone_3_rtl_pedestrians_count = dataframe_hour.loc[maske, "zone_3_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "zone_3_ltr_pedestrians_count"] = zone_3_rtl_pedestrians_count
            dataframe_hour.loc[maske, "zone_3_rtl_pedestrians_count"] = zone_3_ltr_pedestrians_count

            zone_99_ltr_pedestrians_count = dataframe_hour.loc[maske, "zone_99_ltr_pedestrians_count"]
            zone_99_rtl_pedestrians_count = dataframe_hour.loc[maske, "zone_99_rtl_pedestrians_count"]
            dataframe_hour.loc[maske, "zone_99_ltr_pedestrians_count"] = zone_99_rtl_pedestrians_count
            dataframe_hour.loc[maske, "zone_99_rtl_pedestrians_count"] = zone_99_ltr_pedestrians_count


            location_name = "Bahnhofstrasse (Süd)"


    
        data_filtered=pd.concat([data_filtered, dataframe_hour])
    return data_filtered


@app.get("/v1/fragestellung/pedestrians_count")
def fragestellung(date: str = "2024-04-21"): #define a function that takes a name as a query parameter
    data_fragestellung = date_filter(date)

    data_fragestellung = data_fragestellung.filter([
        "location_name",
        "adult_ltr_pedestrians_count",
        "adult_pedestrians_count"
    ])

    return data_fragestellung.to_json(
        orient="records",
        indent=2
    )

@app.get("/v1/erkundung/pedestrians_count")
def erkundung(date: str = "2024-04-21", weather_condition: str | None = None, direction: str | None = None, age: str | None = None): #define a function that takes a name as a query parameter
    data_filtered=date_filter(date)
    
    if weather_condition is not None:
        if "weather_condition" in data_filtered.columns:
            data_filtered = data_filtered[data_filtered["weather_condition"] == weather_condition]
            
    if direction:
        direction = direction.lower()

    if age:
        age = age.lower()
         
    if direction=="bahnhof":
        if age=="erwachsen":
            data_filtered=data_filtered.rename(columns={"adult_rtl_pedestrians_count": "Daten"})
        elif age=="kind":
            data_filtered=data_filtered.rename(columns={"child_rtl_pedestrians_count": "Daten"})
        else:
            data_filtered=data_filtered.rename(columns={"rtl_pedestrians_count": "Daten"})
        
    elif direction in ["bürkliplatz", "uraniastrasse"]:
        if age=="erwachsen":
            data_filtered=data_filtered.rename(columns={"adult_ltr_pedestrians_count": "Daten"})
        elif age=="kind":
            data_filtered=data_filtered.rename(columns={"child_ltr_pedestrians_count": "Daten"})
        else:
            data_filtered=data_filtered.rename(columns={"ltr_pedestrians_count": "Daten"})
            
    else:
        if age=="erwachsen":
            data_filtered=data_filtered.rename(columns={"adult_pedestrians_count": "Daten"})
        elif age=="kind":
            data_filtered=data_filtered.rename(columns={"child_pedestrians_count": "Daten"})
        else:
            data_filtered=data_filtered.rename(columns={"pedestrians_count": "Daten"})  

    data_filtered=data_filtered.filter(["Daten", "location_name"])    
                
    data_Visualisierung=data_filtered.to_json( orient="records", indent=2) #orient="records", indent=2 orient ist dafür da um ein Array zu erhalten und nicht ein Dictionary, ident für bessere lesbarkeit nicht alles auf einer Zeile

    return data_Visualisierung