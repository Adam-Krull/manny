import os

from textwrap import dedent

from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_openai import OpenAIEmbeddings

#initialize embeddings and chat models
embeddings = OpenAIEmbeddings(model='text-embedding-3-large')
model = init_chat_model('gpt-5-nano', model_provider='openai')

#initialize vector store and load from memory
filepath = 'vs.json'
vector_store = InMemoryVectorStore(embeddings).load(filepath, embeddings)

def query_pipeline(query):
    '''Pipeline function to process query, retrieve context, and return response.
    Takes in a query and returns the response from the LLM.'''
    #clean up the query
    query = query.strip()
    #retrieve context for query
    context1, context2 = retrieve_context(query)
    #invoke chat templates using context and query
    prompt = invoke_templates(query, context1, context2)
    #ask llm for chat completion and return
    response = get_response(prompt)
    return response

def retrieve_context(query):
    '''Takes in the user query.
    Returns the 2 most relevant pieces of context from the vector store.'''
    c1, c2 = vector_store.similarity_search(
        query,
        2
    )
    return c1, c2

def invoke_templates(query, c1, c2):
    '''Takes in the user query and additional context.
    Returns completed template for submission to LLM.'''
    #define system template for context
    system_template = dedent('''\
                         Your job is to answer user questions based on information from a manual.
                         Draw directly from the provided context to craft your answer. At the end of
                         your response, cite the page number of the content you used.
                            
                         Page number: {p1}
                         Context: {c1}
                            
                         Page number: {p2}
                         Context: {c2}''').replace('\n', ' ')
    #roll up into a prompt template
    prompt_template = ChatPromptTemplate(
        [('system', system_template), ('user', '{query}')]
    )
    #invoke prompt template with query and context
    prompt = prompt_template.invoke({
        'c1': c1.page_content,
        'c2': c2.page_content,
        'p1': c1.metadata['page_label'],
        'p2': c2.metadata['page_label'],
        'query': query
    })
    #return
    return prompt

def get_response(prompt):
    '''Sends the completed prompt to the LLM.
    Returns the response.'''
    response = model.invoke(prompt)
    return response.content