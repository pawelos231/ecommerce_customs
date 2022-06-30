import styles from "../../../../styles/comments/comments.module.sass";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Delete } from "@material-ui/icons";
const Comments = ({ productId, Language }) => {
  const { data: session } = useSession();
  const [input, inputvalue] = useState("");
  const [commets, postComment] = useState([]);
  const refContainerForCom = useRef(null);
  const fetchComments = async () => {
    await fetch(`/api/comments/${productId}`)
      .then((response) => response.json())
      .then((data) => (console.log(data.comment), postComment(data.comment)));
  };
  const OnPostComment = async (comment) => {
    if (comment != "") {
      refContainerForCom.current.value = "";
      let userObj = {
        Author: session.user.name,
        Photo: session.user.image,
        Content: comment,
        ProductId: productId,
        UserId: session.user.id,
      };
      postComment((prevState) => [...prevState, userObj]);
      await fetch("/api/comments/PostComments", {
        method: "POST",
        body: JSON.stringify(userObj),
      });
      console.log(userObj);
    }
  };
  console.log(commets);
  console.log(productId);

  useEffect(() => {
    const fetchData = async () => {
      await fetchComments();
    };
    fetchData();
  }, [productId]);

  return (
    <>
      {session ? (
        <div className={styles.conForComments}>
          <h3>Komentarze</h3>
          <div className={styles.containerForUserData}>
            <img
              src={session.user.image}
              alt="user photo"
              width={40}
              height={40}
            />
            <p>{session.user.name}</p>
          </div>
          <input
            ref={refContainerForCom}
            placeholder="Napisz komentarz..."
            type="text"
            className={styles.inputStyles}
            onChange={(e) => inputvalue(e.target.value)}
          />
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className={styles.buttonSendComment}
            onClick={() => OnPostComment(input)}
          >
            Opublikuj
          </motion.button>
          <ul>
            {commets.length !== 0 ? (
              commets.map((item) => {
                if (item.UserId == session.user.id) {
                  console.log("pies");
                }
                return (
                  <>
                    <div className={styles.conForCom}>
                      <p className={styles.date}>
                        Dodane:{" "}
                        {item.createdAt !== "" &&
                        item.createdAt !== null &&
                        item.createdAt !== undefined ? (
                          String(item.createdAt).split("T")[0]
                        ) : (
                          <p>brak danych</p>
                        )}
                      </p>
                      <div className={styles.photoContainer}>
                        <Image
                          src={item.Photo}
                          width={20}
                          height={20}
                          objectFit="cover"
                          layout="responsive"
                        />
                      </div>
                      <p className={styles.author}>{item.Author}</p>
                    </div>
                    <div className={styles.conForContentComment}>
                      <p className={styles.Content}>{item.Content}</p>
                      {item.UserId == session.user.id ? (
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                            color: "red",
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                        >
                          <Delete />
                        </motion.div>
                      ) : null}
                    </div>
                  </>
                );
              })
            ) : (
              <div>Nic tu nie ma</div>
            )}
          </ul>
        </div>
      ) : (
        <>
          {Language == "pl" ? (
            <div className={styles.conForComments}>
              <h3>Komentarze</h3>
              Zaloguj się by móc komentować
            </div>
          ) : (
            <div className={styles.conForComments}>
              <h3>Comments</h3>
              Log in to comment
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Comments;
