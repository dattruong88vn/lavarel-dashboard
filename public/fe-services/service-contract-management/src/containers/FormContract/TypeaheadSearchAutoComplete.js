import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {Fragment, useState} from 'react';
const SEARCH_URI = 'https://api.github.com/search/users';

const TypeheadSearchAutoComplete = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    props.onChange(query);
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        const options = items.map((i) => ({
          avatar_url: i.avatar_url,
          id: i.id,
          login: i.login,
        }));

        setOptions(options);
        setIsLoading(false);
      });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      defaultInputValue={props.defaultInputValue}
      onChange={selected=>{
        props.onChange(selected[0].login);
      }}
      placeholder="Nhập ID hoặc địa chỉ Pre-lisitng để tìm kiếm"
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span>{option.login}</span>
        </Fragment>
      )}
    />
  );
};

export default TypeheadSearchAutoComplete;