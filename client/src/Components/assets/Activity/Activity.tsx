import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowNarrowRight } from "@tabler/icons-react";

import "./Activity.css";

const Activity = () => {
  const navigateTo = useNavigate();
  const dateActuel = new Date();

  const [activity, setActivity] = useState([]);

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  useEffect(() => {
    fetch("http://localhost:8081/activities")
      .then((response) => response.json())
      .then((data) => {
        setActivity(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  function activityDate(dateActivity: any) {
    const dateHours = dateActivity.split("T");
    const date = dateHours[0].split("-");
    const hour = dateHours[1].split(":");

    const yearActivity = date[0];
    const mounthActivity = date[1];
    const dayActivity = date[2];

    let hoursActivity = hour[0];
    hoursActivity = parseInt(hoursActivity) + 1;
    const minuteActivity = hour[1];

    if (
      currentYear - yearActivity >= 1 &&
      (currentMonth - mounthActivity > 12 || currentMonth - mounthActivity < 0)
    ) {
      return currentYear - yearActivity + " year(s) ago";
    } else if (
      currentMonth - mounthActivity >= 1 &&
      (currentDay - dayActivity > 25 || currentDay - dayActivity < 0)
    ) {
      return currentMonth - mounthActivity + " mounth(s) ago";
    } else if (
      currentDay - dayActivity >= 1 &&
      (currentHour - hoursActivity > 24 || currentHour - hoursActivity < 0)
    ) {
      return currentDay - dayActivity + " day(s) ago";
    } else if (
      currentHour - hoursActivity >= 1 &&
      (currentMinute - minuteActivity > 55 ||
        currentMinute - minuteActivity < 0)
    ) {
      return currentHour - hoursActivity + " hour(s) ago";
    } else if (currentMinute - minuteActivity >= 1) {
      return currentMinute - minuteActivity + " minute(s) ago";
    } else {
      return "A few second ago";
    }
  }

  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Recent Activity</h1>
        <button className="btn flex">
          See All
          <IconArrowNarrowRight className="icon" />
        </button>
      </div>
      <div className="secContainer grid">
        {activity.map((a: any) => (
          <div key={a.id} className="singleCustomer flex">
            <img
              src="/src/Components/assets/media/oftyn.png"
              alt="Customer Image"
            />
            <div className="customerDetails">
              <span className="name">_oftyn</span>
              <small>{a.detail}</small>
            </div>
            <div className="duration">{activityDate(a.date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
