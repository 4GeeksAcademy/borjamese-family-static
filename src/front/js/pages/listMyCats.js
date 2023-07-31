import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ListMyCats = () => {
  const navigate = useNavigate();
  // const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("miTokenJWT");

    if (!token) {
      // Mmmmm... no tengo el token, no debería poder acceder a está página de React
      navigate("/login");
    }

    const getAllCats = () => {

      fetch(process.env.BACKEND_URL + "/api/cats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFavorites(data)
        })
        .catch((error) => console.log("error", error));
    };
    getAllCats()
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
        {favorites.map((fav, i) => (
      <div className="col" key={i}>
          <div className="card h-100">
            <img src={fav.image_url} className="card-img-top" />
            <p className="fw-bold text-success card-title">{fav.name}</p>
          </div>
      </div>
        ))}
    </div>

    

  );
};
