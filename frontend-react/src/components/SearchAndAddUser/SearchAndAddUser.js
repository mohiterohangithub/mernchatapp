import { useState } from "react";
import s from "./SearchAndAddUser.module.scss";
import { Search, Add } from "../../accts/iconIndex";

function SearchAndAddUser() {
  const [userSearch, setUserSearch] = useState("");

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <div className={s.searchIcon}>
          <Search width="24px" height="24px" />
        </div>
        <input className={s.input} placeholder="Search Your Chat List" />
        <div className={s.addIcon}>
          <Add width="24px" height="24px" />
        </div>
      </div>
    </div>
  );
}

export default SearchAndAddUser;
