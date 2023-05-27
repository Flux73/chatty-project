import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SearchFriends = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const searchFriendsHandler = async (query) => {
      try {
        setLoading(true);
        const req = await axios.get(
          `http://localhost:4000/api/v1/users/search/${query}`,
          {
            withCredentials: true,
          }
        );

        setResults(req.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        console.error(err);
      }
    };

    searchFriendsHandler(query);
  }, [query]);

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal cursor-pointer">
        <label className="modal-box relative py-10 px-0" htmlFor="">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-xl text-secondary text-center font-bold mb-5">
            Search for friends :)
          </h1>
          <div className="form-control mb-8 px-10">
            <label className="input-group">
              <input
                type="text"
                placeholder="Search..."
                className="input input-secondary grow"
                onChange={(e) => setQuery(e.target.value)}
              />
              <span>S</span>
            </label>
          </div>
          {query ? (
            <div className="overflow-y-auto h-96">
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : results.length === 0 ? (
                <p className="text-center text-xl font-black">
                  No Friends were found ;(
                </p>
              ) : (
                results.map((el) => (
                  <Link
                    href={`/en/profile/${el._id}`}
                    className="flex gap-4 hover:bg-base-300 px-10 py-2"
                  >
                    <div className={`avatar z-0`}>
                      <div className="mask mask-squircle">
                        <Image
                          src="/imgs/profile.jpg"
                          width={50}
                          height={50}
                          alt="Profile Picture"
                        ></Image>
                      </div>
                    </div>
                    <h2 className="font-medium">{el.username}</h2>
                  </Link>
                ))
              )}
            </div>
          ) : null}
        </label>
      </label>
    </>
  );
};

export default SearchFriends;
