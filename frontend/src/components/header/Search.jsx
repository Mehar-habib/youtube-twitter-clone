import { useForm } from "react-hook-form";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllVideos } from "../../store/slices/videoSlice";

function Search() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = (data) => {
    const query = data?.query;
    navigate(`/search/${query}`);
    dispatch(getAllVideos({ query }));
  };
  return (
    <>
      <form onSubmit={handleSubmit(search)}>
        <Input
          placeholder="Search"
          {...register("query", { required: true })}
        />
      </form>
    </>
  );
}

export default Search;
