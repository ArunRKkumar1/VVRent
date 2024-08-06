import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "../Components/subComponent/SideBarMenu";

// icons
import { RiMotorbikeFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaListOl } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import { SiGoogletagmanager } from "react-icons/si";
import { TbWriting } from "react-icons/tb";
import { HiReceiptRefund } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/manage/bike",
    name: "Manage Bike",
    icon: <RiMotorbikeFill />,
    subRoutes: [
      {
        path: "/manage/bike/addBike",
        name: "Add Bike ",
        icon: <IoMdAdd />,
      },
      {
        path: "/manage/bike/editBike/",
        name: "Edit Bike",
        icon: <FaRegEdit />,
      },
      {
        path: "/manage/bike/allBikes",
        name: "All Bikes",
        icon: <FaListOl />,
      },
    ],
  },
  ,
  {
    path: "/users",
    name: "Manage Users",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/manage/user/createUser",
        name: "Create User ",
        icon: <RiUserAddFill />,
      },
      {
        path: "/manage/user/allUser",
        name: "All User",
        icon: <FaListOl />,
      },
    ],
  },
  {
    path: "/manage/booking",
    name: "Manage Booking",
    icon: <SiGoogletagmanager />,
    subRoutes: [
      {
        path: "/manage/booking/addBooking",
        name: "Add booking",
        icon: <TbWriting />,
      },
      {
        path: "/manage/booking/allBooking",
        name: "All Booking",
        icon: <FaListOl />,
      },
      {
        path: "/manage/booking/Extend",
        name: "Extend Duration",
        icon: <IoMdAdd />,
      },
    ],
  },
  {
    path: "/manage/refund",
    name: "Manage Refund",
    icon: <HiReceiptRefund />
    ,
    subRoutes:[
      {
        path: "/manage/refund/allRefund",
        name: "All Refunds",
        icon: <FaListOl />,
      },
    ]
  },
  {
    path: "/borrowers",
    name: "Borrowing",
    icon: <GiReceiveMoney />,
    subRoutes: [
      {
        path: "/manage/borrowers/all",
        name: "All Borrowers ",
        icon: <FaListOl/>,
      },
    ]
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/contactUs",
    name: "Contact us",
    icon: <MdMessage />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <span className="SideBar-container h-full">
      <div className={`main-container ${isOpen && 'h-full'}  md:h-full`}>
        <motion.div
          animate={{
            width: isOpen ? "15rem" : "3rem",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 12,
            },
          }}
          className={`sidebar bg-[#00073d] dark:bg-[#222222]`}
        >
          <div className="top_section" >
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars cursor-pointer" onClick={toggle} >
              <FaBars className="text-2xl" />
            </div>
          </div>

          <section className={`routes  ${!isOpen && 'hidden'} md:flex`}>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (<span key={index}>
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                </span>
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </span>
  );
};

export default SideBar;
