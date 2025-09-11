from fastapi import Body, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from typing import Annotated

from functions import query_pipeline

app = FastAPI()
origins = ['http://localhost:3000']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.post('/')
async def post_query(
    query: Annotated[str, Body()]
):
    #call our pipeline on the query and return
    response = query_pipeline(query)
    return response