import {
    Form,
    Button,
    VStack
} from 'rsuite';

import React from 'react';

import MessageBubbles from './Messages';
import { makeQuery } from '../routes';

function FormStack({ messages, setMessages }) {
    const [query, setQuery] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    async function handleSubmission() {
        setLoading(true);
        console.log('Sending query: ', query);
        const response = await makeQuery({ query });
        setMessages([
            ...messages,
            {
                'source': 'User',
                'content': query
            },
            {
                'source': 'Model',
                'content': response
            }
        ]);
        setLoading(false);
        setQuery('');
    }
    return (
        <>
        <VStack align='center'>
            <MessageBubbles messages={ messages } isLoading={ isLoading } />
            <Form onSubmit={ handleSubmission } layout='vertical'>
              <Form.Group controlId='query'>
                <Form.Label>How can we help you?</Form.Label>
                <Form.Control value={ query } onChange={ e => setQuery(e)} name='query' />
                <Form.Text>If the answer is unhelpful, be more specific.</Form.Text>
              </Form.Group>
              <Form.Group>
                <Button type='submit' appearance='primary'>Submit</Button>
              </Form.Group>
            </Form>
        </VStack>    
        </>    
    );
};

export default FormStack;