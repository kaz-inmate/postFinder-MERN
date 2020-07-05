import React, {useContext, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import { PostContext } from '../context/PostContext';

const SearchBar = () => {
    const {searchUser, clearSearch} = useContext(PostContext);
    const searchValue = useRef('')

    const handleChange = (e) => {
        if(searchValue.current.value !== " ") {
            searchUser(e.target.value)
        } else {
            clearSearch()
        }
    }
    return(
        <form>
            <TextField ref={searchValue} id="standard-basic" label="Search..." 
            onChange={handleChange} />
        </form>
    )
}

export default SearchBar;