import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

class BooksFilter extends React.Component {
  render() {
    const options = [
      { value: "id", label: "По умолчанию", selected: true },
      { value: "price", label: "Сначала дороже" },
      { value: "name", label: "По названию" },
      { value: "rating", label: "По рейтингу" },
    ];
    const { handleOnChangeFilter } = this.props;

    return (
      <div>
        <Select
          className="react-select-container"
          defaultValue={options[0]}
          options={options}
          onChange={handleOnChangeFilter}
          closeMenuOnSelect={true}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            borderColor: "none",
            padding: 0,
            colors: {
              ...theme.colors,
              primary25: "#5dc8e9",
              primary: "#5c99e9",
            },
          })}
        />
      </div>
    );
  }
}
export default BooksFilter;

BooksFilter.propTypes = {
  handleOnChangeFilter: PropTypes.func.isRequired,
};
