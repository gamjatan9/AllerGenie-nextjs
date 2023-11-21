import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./ModalIngredient";

const MedSideEffect = ({ medicineId }) => {
  const [mediData, setMediData] = useState({
    image: "아네모정",
    name: "",
    effect: "",
    caution: "",
    sideEffect: ""
  });

  useEffect(() => {
   if (medicineId) {
     axios.get(`http://localhost:8000`)
       .then((response) => {
         const data = response.data;
         setMediData({
           image: data.image,
           name: data.name,
           effect: data.effect,
           caution: data.caution,
         });
       })
       .catch((error) => {
         console.error("Error fetching medicine data:", error);
       });
   } else {
     // Handle the case when medicineName is null
     setMediData({
       image: "",
       name: "",
       effect: "kk",
       caution: "이 약의 투여기간 동안 다량의 우유를 섭취하는 것은 삼가세요. ",
       sideEffect: "아네모정은 탄산마그네슘, 탄산수소나트륨, 침강탄산칼슘, 건조수산화알루미늄겔, 스코폴리아엑스 등 5개 성분의 복합제다. 진경제 성분인 스코폴리아엑스가 위산으로 인한 속쓰림·메스꺼움을 완화하고, 위 통증·경련을 억제한다."
     });
   }
 }, [medicineId]);

 const [modalVisible, setModalVisible] = useState(false);
 const handleImageClick = () => {
   setModalVisible(!modalVisible);
 };
 const closeModal = () => {
   setModalVisible(false);
 };


  return (
    <div className="MyPage-main">
      <section className="Mypage-se">
        <div className="Mypage-se-title">약의 효능</div>
        <div className="Mypage-se-container">
         {mediData.sideEffect}
        </div>
      </section>
      <section className="Mypage-caution">
        <div className="Mypage-se-title">약의 부작용 & 주의사항</div>
        <div className="Mypage-caution-container">
          <div className="Mypage-caution-img" onClick={handleImageClick}>
            <img src={mediData.image}  />
          </div>
          <div className="Mypage-caution-content">
            <div className="Mypage-caution-name">{medicineId}</div>
            <div className="Mypage-caution-about">{mediData.caution}</div>
          </div>
        </div>
        {modalVisible && (
          <Modal mediName={medicineId} imageUrl={mediData.image} closeModal={closeModal}  />
        )}
      </section>
    </div>
  );
};

export default MedSideEffect;
