import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired
    };
    
    onChange = (e) => {
        this.setState({text: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.searchUsers(this.state.text);
    };

    render() {
        const {clearUsers, showClear} = this.props;
        return(
            <div>
                <form className='form' onSubmit={this.onSubmit}>
                    <input 
                        type='text' 
                        name='text'
                        data-test-id='searchBox' 
                        placeholder='Enter username...' 
                        value={this.state.text}
                        onChange={this.onChange} />
                    <button type='submit' className='btn btn-dark btn-block'>Search</button>
                </form>
                {showClear && 
                <button 
                    onClick={clearUsers} 
                    className='btn btn-light btn-block'
                    data-test-id='clearButton'
                >
                    Clear
                </button>
                }
            </div>
        );
    };
};

export default Search;