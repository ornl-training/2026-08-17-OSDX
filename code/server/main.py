import os
from typing import Any, Dict, List

import pandas as pd
from fastapi import FastAPI

app = FastAPI()

data_frames = {}
for file in os.listdir("data"):
    if not file.endswith(".csv"):
        continue

    path = os.path.join("data", file)
    data_frames[file] = pd.read_csv(path, header=None)


@app.get("/data/")
def list_items() -> Dict[str, List[str]]:
    return {"files": sorted(data_frames.keys())}


@app.get("/data/{filename}")
def read_item(filename: str) -> Dict[str, Any]:
    if filename not in data_frames:
        return {"error": "Data file not found."}

    return {"dataset": data_frames[filename].to_dict(orient="split")}
