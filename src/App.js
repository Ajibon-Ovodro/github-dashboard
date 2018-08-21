import React, { Component } from 'react';
import { Layout } from 'antd';
import SideMenu from './components/SideMenu';
import SearchBox from './components/SearchBox';
import Main from './components/Main';

import 'antd/dist/antd.css';
import './App.css';

import axios from 'axios';

const { Header, Content, Sider } = Layout;

class App extends Component {
  state = {
    user_data: null,
    repo_data: [],
    events_data: [],
    followers_data: [],
    following_data: [],
  }

  fetchData(username){
    axios.get(`https://api.github.com/users/${username}`)
      .then((user_resp)=>{
        this.setState({
          user_data: {
            name: user_resp.data.name,
            bio: user_resp.data.bio,
            avatar_url: user_resp.data.avatar_url,
            followers: user_resp.data.followers,
            following: user_resp.data.following,
          }
        })
      })
      .catch((error)=>{
        console.log(error);
      });

    axios.get(`https://api.github.com/users/${username}/repos`)
      .then((repo_resp)=>{
        this.setState({
          repo_data: repo_resp.data.map(repo => ({
            id: repo.id,
            name: repo.name,
            owner: repo.owner,
            description: repo.description,
            html_url: repo.html_url,
          }))
        })
      })
      .catch((error)=>{
        console.log(error);
      });

    axios.get(`https://api.github.com/users/${username}/events`)
      .then((event_resp)=>{
        this.setState({
          events_data: event_resp.data.map(event => ({
            type: event.type,
            repo: event.repo,
          }))
        })
      })
      .catch((error)=>{
        console.log(error);
      });

    axios.get(`https://api.github.com/users/${username}/followers`)
      .then((followers_resp)=>{
        this.setState({
          followers_data: followers_resp.data.map(follower => ({
            login: follower.login,
            html_url: follower.html_url,
            avatar_url: follower.avatar_url,
          }))
        })
      })
      .catch((error)=>{
        console.log(error);
      });

    axios.get(`https://api.github.com/users/${username}/following`)
      .then((following_resp)=>{
        this.setState({
          following_data: following_resp.data.map(following => ({
            login: following.login,
            html_url: following.html_url,
            avatar_url: following.avatar_url,
          }))
        })
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  componentDidMount(){
    this.fetchData('Ajibon-Ovodro');
  }

  render() {
    return (
      <Layout>

        <Sider style={{ overflow: 'auto', height: '100vh'}}>
          <SideMenu/>
        </Sider>

        <Layout style={{ marginLeft: 200 }} style={{height:'100vh'}}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <SearchBox fetchData={this.fetchData.bind(this)}/>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff'}}>
              <Main
                user_data={this.state.user_data}
                events_data={this.state.events_data}
                followers_data={this.state.followers_data}
                following_data={this.state.following_data}
                repo_data={this.state.repo_data}
              />
            </div>
          </Content>
        </Layout>
        
      </Layout>
    );
  }
}

export default App;
