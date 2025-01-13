import React from 'react';
import {Typography} from 'antd';

const { Title, Paragraph } = Typography;
const Home = () => (
    <Typography>
        <Title>Travel cosy</Title>

        <Paragraph>
            Book the whole tour
        </Paragraph>


        <Title level={2}>Choose a unique accommodation</Title>

        <Paragraph>
            We have everything from castles and villas to floating hotels and igloos
        </Paragraph>

    </Typography>
);
export default Home;