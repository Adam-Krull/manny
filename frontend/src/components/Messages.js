import {
    Card,
    Grid,
    Row,
    Col,
    Placeholder
} from 'rsuite';

function UserCard({ header, body }) {
    return (
        <Col span={{ sm: 8 }} offset={{ sm: 12 }}>
            <Card minWidth={300}>
                <Card.Header as={'h6'} backgroundColor={'#141414'}>{ header }</Card.Header>
                <Card.Body backgroundColor={'#141414'}>{ body }</Card.Body>
            </Card>
        </Col>
    );
};

function ModelCard({ header, body }) {
    return (
        <Col span={{ sm: 16 }}>
            <Card minWidth={800}>
                <Card.Header as={'h6'} backgroundColor={'#3b3b3b'}>{ header }</Card.Header>
                <Card.Body backgroundColor={'#3b3b3b'}>{ body }</Card.Body>
            </Card>
        </Col>
    )
}

function MessageBubbles({ messages, isLoading }) {
    return (
        <>
        <Grid fluid>
            <div style={{ whiteSpace: 'pre-wrap' }}>
                {messages.map(message => (
                    <Row gutter={16} style={{ marginBottom: '5px' }}>
                        {message.source === 'User' && (
                            <UserCard header={ message.source } body={ message.content } />
                        )}
                        {message.source === 'Model' && (
                            <ModelCard header={ message.source } body={ message.content } />
                        )}
                    </Row>
                ))}
                {isLoading === true && (
                    <>
                    <Row gutter={16} style={{ marginBottom: '5px' }}>
                        <UserCard header={ <Placeholder.Paragraph rows={1} /> } body={ <Placeholder.Paragraph rows={1} />} />
                    </Row> 
                    <Row gutter={16} style={{ marginBottom: '5px' }}>
                        <ModelCard header={ <Placeholder.Paragraph rows={1} /> } body={ <Placeholder.Paragraph rows={5} />} />
                    </Row>   
                    </>
                )}
            </div>
        </Grid>    
        </>
    );
};

export default MessageBubbles;