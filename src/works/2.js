import React, { useState, useEffect, useCallback } from "react";

export default (props) => {
  const [inputValues, setInputValues] = useState(
    parseUrl(props.location.search)
  );

  useEffect(() => console.log(stringifyUrl(inputValues)), [inputValues]);

  const updateCheckbox = useCallback(
    (updatedInputField, value) => (updatedInputField[value] ? "" : ++value),
    []
  );

  const updateInputValues = useCallback(
    (field, updatedValue) => ({
      ...inputValues,
      [field]: updatedValue,
    }),
    [inputValues]
  );

  const onChangeCheckbox = useCallback(
    (e) => {
      let updatedInputField =
        Object.assign({}, inputValues)[e.target.name] || [];

      updatedInputField[e.target.value] = updateCheckbox(
        updatedInputField,
        e.target.value
      );
      setInputValues(updateInputValues(e.target.name, updatedInputField));
    },
    [inputValues, updateInputValues, updateCheckbox]
  );

  const onChangeSelect = useCallback(
    (e) =>
      setInputValues(
        updateInputValues(
          "manufacturer",
          [...e.target.options]
            ?.filter((x) => x.selected)
            .map((x) => x.innerText)
        )
      ),
    [updateInputValues]
  );

  return (
    <div>
      <div>
        {["Small", "Medium", "Large"].map((value, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              name="size"
              value={index}
              defaultChecked={inputValues?.size?.includes(value[0])}
              onChange={() =>
                setInputValues({ ...inputValues, size: [value[0]] })
              }
            />
            <label htmlFor={value.toLowerCase()}>{value}</label>
          </React.Fragment>
        ))}
      </div>
      <div>
        {[
          ...(inputValues?.color || []),
          ...Array(5 - (inputValues?.color?.length || 0)).fill(""),
        ].map((value, index) => (
          <input
            key={index}
            type="checkbox"
            name="color"
            value={index}
            checked={+value === ++index}
            onChange={onChangeCheckbox}
          />
        ))}
      </div>
      <div>
        <select multiple="multiple" onChange={onChangeSelect}>
          {["aaa", "b&c", "ddd", "eee"].map((opt, index) => (
            <option key={index}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="checkbox"
          name="sale"
          value={0}
          checked={+inputValues?.sale?.[0] === 1}
          onChange={onChangeCheckbox}
        />
      </div>
    </div>
  );
};

const parseUrl = (query) => {
  const regExp = /(?<=[?&])[^&]+/g;
  const parsedUrl = query
    .match(regExp)
    ?.map((inputValue) => inputValue.match(/[^=]+/g));

  return parsedUrl?.reduce(
    (acc, el) => (
      acc[el[0]]?.length
        ? acc[el[0]].push(el[1])
        : (acc = { ...acc, [el[0]]: [el[1]] }),
      acc
    ),
    {}
  );
};

const stringifyUrl = (inputValues) =>
  `${window.location.href}/filter${Object.entries(inputValues || {}).reduce(
    (accFields, inputFields) => (
      (accFields += inputFields[1].reduce(
        (accField, inputField) => (
          (accField += inputField ? `${inputFields[0]}=${inputField}&` : ""),
          accField
        ),
        ""
      )),
      accFields
    ),
    "?"
  )}`.slice(0, -1);
