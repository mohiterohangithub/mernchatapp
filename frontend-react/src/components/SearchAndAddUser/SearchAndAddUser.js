import { useState } from "react";
import { Search, Add } from "../../accts/iconIndex";
import { useInfoContext } from "../../globleContext/InfoContext";

import s from "./SearchAndAddUser.module.scss";

function SearchAndAddUser() {
  const [userSearch, setUserSearch] = useState("");

  const { setAddPopup } = useInfoContext();

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <div className={s.searchIcon}>
          <Search width="24px" height="24px" />
        </div>
        <input className={s.input} placeholder="Search Your Chat List" />
        <div
          onClick={() =>
            setAddPopup((pre) => {
              return { ...pre, open: !pre.open };
            })
          }
          className={s.addIcon}
        >
          <Add width="24px" height="24px" />
        </div>
      </div>
    </div>
  );
}

export default SearchAndAddUser;
