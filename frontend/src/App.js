import {
  CustomProvider,
  Container,
  Heading,
  Header,
  Content,
  Footer,
  Text,
  Sidebar,
  Sidenav,
  Divider,
} from 'rsuite';

import React from 'react';

import 'rsuite/dist/rsuite.min.css';

import FormStack from './components/Form.js';

function App() {
  const[messages, setMessages] = React.useState([]);
  console.log(messages);
  return (
    <CustomProvider theme='high-contrast'>
    <Container height='100vh'>
      <Header>
        <Heading level={1}><Text align='center'>Production Planning and Scheduling</Text></Heading>
      </Header>  
      <Divider></Divider>
      <Container>
        <Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={300}>
        <Sidenav>
          <Sidenav.Header><Text align='center'>Conversation history</Text></Sidenav.Header>
        </Sidenav>  
        </Sidebar>
        <Content padding={'20px'}>
          <FormStack messages={ messages } setMessages={ setMessages } /> 
        </Content>
        <Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={300}></Sidebar>
      </Container>  
      <Divider></Divider>
      <Footer>
        <Heading><Text align='center'>Forgentics</Text></Heading>
      </Footer>  
    </Container>
    </CustomProvider>
  );
}

export default App;
