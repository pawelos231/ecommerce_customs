import styles from "../../../../styles/comments/comments.module.sass";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Delete } from "@material-ui/icons";
import useFetch from "../../../../hooks/useFetch";
import { Pagination } from "@mui/material";
import { CircularProgress } from "@material-ui/core";
import userInfo from "../../../../interfaces/interfaces";
const Comments = ({ productId, Language }) => {
  const { data: session } = useSession();
  const [input, inputvalue] = useState<string>("");
  const [commets, postComment] = useState<userInfo | any>([]);
  const [pages, SetPage] = useState<number>(1);
  const refContainerForCom = useRef(null);
  const Paginated = async () => {
    await fetch(`/api/comments/${productId}/countPages`)
      .then((response) => response.json())
      .then((data) => SetPage(data.NumberOfPaginatedPages));
  };
  const fetchComments = async (pages, currentPage = 1) => {
    await fetch(`/api/comments/${productId}`, {
      method: "POST",
      body: JSON.stringify({
        pages,
        currentPage,
      }),
    })
      .then((response) => response.json())
      .then((data) => postComment(data.comment));
  };
  const deleteComment = async (index) => {
    await fetch(
      `/api/comments/${commets[index]?.id}/deleteComments/${session.user.id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
    commets.splice(index, 1);
    postComment((prevState) => [...commets]);
  };
  const OnPostComment = async (comment: any) => {
    if (comment != "") {
      refContainerForCom.current.value = "";
      let userObj = {
        Author: session.user.name,
        Photo: session.user.image,
        Content: comment,
        ProductId: productId,
        UserId: session.user.id,
      };
      postComment((prevState: any) => [...prevState, userObj]);
      await fetch("/api/comments/PostComments", {
        method: "POST",
        body: JSON.stringify(userObj),
      });
      console.log(userObj);
    }
  };
  console.log(commets);
  console.log(productId);

  const [comments, loading, error] = useFetch(`/api/comments/${productId}`);
  const commentsUsers = comments?.comment;
  useEffect(() => {
    Paginated();
  }, [productId]);

  useEffect(() => {
    fetchComments(pages, 1);
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
          <div className={styles.containerForButtons}>
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
          </div>
          <ul>
            {commets.length !== 0 ? (
              commets.map((item, i) => {
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
                          onClick={() => deleteComment(i)}
                        >
                          <Delete />
                        </motion.div>
                      ) : null}
                    </div>
                  </>
                );
              })
            ) : (
              <div className={styles.nothingIsHere}>Nic tu nie ma</div>
            )}
          </ul>
        </div>
      ) : (
        <>
          {Language == "pl" ? (
            <div className={styles.conForComments}>
              <h3>Komentarze</h3>
              {loading == false ? (
                <>
                  {commentsUsers?.length !== 0 ? (
                    commentsUsers?.map((item, i) => {
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
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <div className={styles.nothingIsHere}>Nic tu nie ma</div>
                  )}
                </>
              ) : (
                <div className={styles.ContainerForSpinner}>
                  <CircularProgress thickness={2} color="primary" size={80} />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.conForComments}>
              <h3>Comments</h3>
              Log in to comment
            </div>
          )}
        </>
      )}
      <div className={styles.containerForPagination}>
        <Pagination
          count={pages}
          size="large"
          color="secondary"
          onChange={function (event, page) {
            fetchComments(pages, page);
          }}
        />
      </div>
    </>
  );
};

export default Comments;
