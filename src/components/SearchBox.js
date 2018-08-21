import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;

class SearchBox extends Component {

  render() {
    return (
      <Search
        style={{
          width: '300px',
          marginLeft: '20px',
        }}
        placeholder="Github Username"
        onSearch={value => this.props.fetchData(value)}
        enterButton
      />
    );
  }

}

export default SearchBox;
