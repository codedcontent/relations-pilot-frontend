/* eslint-disable react/prop-types */

const TextField = ({ title, value, type, handleChange, name }) => {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-gray-600">
        {title}
      </label>

      <input
        className="w-full p-2 mb-4 border rounded-md"
        type={type}
        value={value}
        placeholder={"Your " + `${title}`.toLowerCase()}
        name={name}
        onChange={handleChange}
        required={name !== "email" ? true : false}
      />
    </div>
  );
};

export default TextField;
