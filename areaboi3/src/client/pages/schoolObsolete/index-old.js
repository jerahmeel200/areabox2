import Header from '../../layouts/Header/header';
import Title from '../../components/PageTitle';
import Footer from '../../layouts/Footer/Footer';
import Contents from '../../components/Contents/Contents';

import { Button } from 'antd';

const index = () => {
  const subjects = [
    'Science',
    'Health Ed',
    'Art',
    'English',
    'Computer',
    'History',
    'French',
    'Social St',
    'Mathematics',
    'Physical Ed',
    'Music'
  ];
  const PostsData = [
    {
      category: 'News',
      title: 'CNN Acquire BEME',
      text: "CNN purchased Casey Neistat's Beme app for $25million.",
      image: 'https://source.unsplash.com/user/erondu/600x400'
    },
    {
      category: 'Travel',
      title: 'Nomad Lifestyle',
      text: 'Learn our tips and tricks on living a nomadic lifestyle',
      image: 'https://source.unsplash.com/user/_vickyreyes/600x400'
    },
    {
      category: 'Development',
      title: 'React and the WP-API',
      text: 'The first ever decoupled starter theme for React & the WP-API',
      image: 'https://source.unsplash.com/user/ilyapavlov/600x400'
    },
    {
      category: 'News',
      title: 'CNN Acquire BEME',
      text: "CNN purchased Casey Neistat's Beme app for $25million.",
      image: 'https://source.unsplash.com/user/erondu/600x400'
    },
    {
      category: 'Travel',
      title: 'Nomad Lifestyle',
      text: 'Learn our tips and tricks on living a nomadic lifestyle',
      image: 'https://source.unsplash.com/user/_vickyreyes/600x400'
    },
    {
      category: 'Development',
      title: 'React and the WP-API',
      text: 'The first ever decoupled starter theme for React & the WP-API',
      image: 'https://source.unsplash.com/user/ilyapavlov/600x400'
    }
  ];

  return (
    <div style={{ background: '#F2F2F2' }}>
      <Header />
      <Title title="School" icon="../static/img/school_icon.png" />
      <Contents filters={subjects} data={PostsData} />
      <div
        offsetBottom={10}
        style={{ margin: 50, display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" style={{ borderRadius: 4 }}>
          Basic School
        </Button>
        <Button
          type="ghost"
          style={{ marginLeft: '10px', marginRight: '10px', borderRadius: 4 }}>
          High School
        </Button>
        <Button type="primary" style={{ marginRight: '10px', borderRadius: 4 }}>
          Master Class
        </Button>
        <Button type="ghost" style={{ borderRadius: 4 }}>
          Daily Nuggets
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default index;
