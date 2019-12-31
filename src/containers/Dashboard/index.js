import React from 'react';
import { Card, Col, Row, Progress } from 'antd';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Pie from './pie.js';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};
const tabListNoTitle = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
  {
    key: 'project',
    tab: 'project',
  },
];

const Dashboard = () => {
  const state = {
    key: 'tab1',
    noTitleKey: 'app',
  };

  const onTabChange = (key, type) => {
    console.log(key, type);
    //this.setState({ [type]: key });
  };

  return (
    <div style={{}}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="파이차트" bordered={false} extra={<a href="#">More</a>}>
            <Pie />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="바차트" bordered={false} extra={<a href="#">More</a>}>
            <ResponsiveContainer height={150}>
              <BarChart data={data}>
                <Bar dataKey="uv" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="라인차트" bordered={false} extra={<a href="#">More</a>}>
            <ResponsiveContainer height={150}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <br />
      <Card
        style={{ width: '100%' }}
        title="Card title"
        extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={state.key}
        onTabChange={key => {
          onTabChange(key, 'key');
        }}
      >
        {contentList[state.key]}
      </Card>
      <br />
      <Card>
        <Progress type="circle" percent={75} />
        <Progress type="circle" percent={70} status="exception" />
        <Progress type="circle" percent={100} />
      </Card>
      <br />
      <Card>
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={99.9}
        />
        <Progress
          strokeColor={{
            from: '#108ee9',
            to: '#87d068',
          }}
          percent={99.9}
          status="active"
        />
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={90}
        />
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={100}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
