import { Drawer, List, Button, Flex, WhiteSpace } from "antd-mobile";
import { Typography } from "antd";
import React, { useState, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { getInitials } from "utils/userInfo";
import TextAvatar from "components/TextAvatar";
import Avatar from "components/Avatar";
import Header from "components/Header";
import FeedbackSubmitButton from "components/Button/FeedbackModalButton";
import Footnote from "components/Footnote";
import CookieAlert from "components/CookieAlert";
import RadioGroup from "components/Feedback/RadioGroup";
import RadioModal from "components/Feedback/RadioModal";
import RatingModal from "components/Feedback/RatingModal";
import StyledInput from "components/StepWizard/StyledTextInput";
import TextFeedbackModal from "components/Feedback/TextFeedbackModal";
import ThanksModal from "components/Feedback/ThanksModal";
import withLabel from "components/Input/with-label";
import Main from "./Main";
import MobileTabs from "./MobileTabs";
import { theme } from "constants/theme";
import { TOGGLE_STATE, SET_VALUE } from "hooks/actions/feedbackActions";
import { feedbackReducer } from "hooks/reducers/feedbackReducer";
import Logo from "components/Logo";
import logo from "assets/logo.svg";

const NOTION_URL =
  "https://www.notion.so/fightpandemics/FightPandemics-Overview-cd01dcfc05f24312ac454ac94a37eb5e";

const initialState = {
  ratingModal: false,
  textFeedbackModal: false,
  rating: "",
  mostValuableFeature: "",
  whatWouldChange: "",
  generalFeedback: "",
  covidImpact: "",
};

const { royalBlue, tropicalBlue, white } = theme.colors;

const drawerStyles = {
  position: "relative",
  overflow: "hidden",
  WebkitOverflowScrolling: "touch",
};

const sidebarStyle = {
  background: `${royalBlue}`,
};

const MenuContainer = styled.div`
  width: 63vw !important;
  overflow: hidden;
  @media screen and (min-width: 1024px) {
    width: 20vw !important;
  }
`;

const NavList = styled(List)`
  & .am-list-body {
    background: unset;
    border-width: 0 !important;
    position: absolute;
    width: 100%;
    & div:not(:last-child) {
      & .am-list-line {
        border-bottom: 0;
      }
    }
    &::after {
      height: 0px !important;
    }

    &::before {
      height: 0px !important;
    }
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavItem = styled(List.Item)`
  background: unset;
  padding-left: 2.1rem;
  height: ${(props) => props.height ?? "inherit"};
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    & .am-list-content {
      color: ${white};
      cursor: pointer;
      font-family: "Poppins", sans-serif;
      font-size: ${(props) => (props.size === "small" ? "2rem" : "2.4rem")};
      font-weight: ${(props) => (props.size === "small" ? "400" : "600")};
      line-height: 6rem;
      padding: 0;
      margin: ${(props) =>
        typeof props.margin != undefined ? props.margin : "inherit"};
    }
  }

  &.am-list-item-active {
    background: ${tropicalBlue};
  }
`;

const NavItemBrief = styled(NavItem)`
  padding-left: 4.6rem;
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    & .am-list-content {
      font-size: 1.8rem;
      font-weight: normal;
      line-height: 3.5rem;
    }
  }
`;

const UserName = styled(Typography.Text)`
  padding: 1.2rem 1.2rem;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  color: ${white};
`;

const Space = styled.div`
  height: ${(props) => props.height ?? "1rem"};
`;

const CloseNav = styled(Button).attrs(() => ({
  inline: true,
  icon: "cross",
  size: "lg",
}))`
  background: unset;
  border-width: 0 !important;
  border-radius: 0;
  color: ${white};
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  top: 4px;
  right: 0.4rem;
  z-index: 300;

  &.am-button-active {
    background: none;
    color: ${white};
  }
  &::before {
    display: none;
  }

  .am-icon {
    stroke-width: 2px;
    stroke: ${white};
  }
`;

const BriefLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: normal;
  line-height: 4.5rem;
`;

const DividerLine = styled.div`
  height: 0.1px;
  background-color: ${white};
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const AvatarInitials = styled(Typography.Text)`
  font-family: Poppins;
  font-size: 32.9px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
`;

const NavigationLayout = (props) => {
  const { mobiletabs, tabIndex, isAuthenticated, user } = props;
  const history = useHistory();
  const [drawerOpened, setDrawerOpened] = useState(false);

  const displayInitials = (user) => {
    if (user?.firstName && user?.lastName) {
      const userinitials = getInitials(user.firstName, user.lastName);
      return <AvatarInitials>{userinitials}</AvatarInitials>;
    }
  };

  const displayFullName = (user) =>
    user ? `${user?.firstName} ${user?.lastName}` : "";

  const [feedbackState, feedbackDispatch] = useReducer(
    feedbackReducer,
    initialState,
  );

  const {
    ratingModal,
    textFeedbackModal,
    radioModal,
    thanksModal,
    rating,
    mostValuableFeature,
    whatWouldChange,
    generalFeedback,
    age,
    covidImpact,
  } = feedbackState;

  const dispatchAction = (type, key, value) => {
    feedbackDispatch({ type, key, value });
  };

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const toggleModal = (modalName) => {
    dispatchAction(TOGGLE_STATE, modalName);
  };

  const closeRatingModal = (ratingValue) => {
    if (drawerOpened) {
      toggleDrawer();
    }
    dispatchAction(SET_VALUE, "rating", ratingValue);
    toggleModal("ratingModal");
    toggleModal("textFeedbackModal");
  };

  const closeTextFeedbackModal = () => {
    toggleModal("textFeedbackModal");
    toggleModal("radioModal");
  };

  const closeRadioModal = () => {
    toggleModal("radioModal");
    toggleModal("thanksModal");
  };

  const renderThanksModal = () => {
    return (
      <ThanksModal
        onClose={() => dispatchAction(TOGGLE_STATE, "thanksModal")}
        visible={thanksModal}
        transparent
      >
        <h2 className="title">Thank you!</h2>
        <p>
          Your input means a lot and helps us help you and others during and
          after the COVID-19 pandemic.
        </p>
        <Logo src={logo} alt="Fight Pandemics logo" />
      </ThanksModal>
    );
  };

  const renderRadioModal = () => {
    const inputLabelsText = [
      {
        stateKey: "age",
        label: "What is your age?",
      },
    ];

    const radioButtonOptions = [
      {
        stateKey: "covidImpact",
        value: "I go to work/school normally",
      },
      {
        stateKey: "covidImpact",
        value: "I am healthy but in a stay-at-home quarantine",
      },
      {
        stateKey: "covidImpact",
        value: "I have mild symptoms but haven't been tested",
      },
      {
        stateKey: "covidImpact",
        value: "I am diagnosed with Covid-19",
      },
    ];

    const RadioGroupWithLabel = withLabel(() => (
      <RadioGroup
        onChange={true}
        options={radioButtonOptions}
        value={true}
        padding="1rem 1rem"
      ></RadioGroup>
    ));

    return (
      <RadioModal
        maskClosable={true}
        closable={true}
        visible={radioModal}
        onClose={() => closeRadioModal()}
        transparent
      >
        <h2 className="title">We are almost done!</h2>
        {inputLabelsText.map((label, index) => (
          <>
            <StyledInput
              key={index}
              label={label.label}
              value={label.stateKey}
              onChange={dispatchAction}
            ></StyledInput>
            <RadioGroupWithLabel label={"How has COVID-19 impacted you?"} />
          </>
        ))}
        <FeedbackSubmitButton
          title="Submit Feedback"
          onClick={closeRadioModal}
          dark
        ></FeedbackSubmitButton>
      </RadioModal>
    );
  };

  const renderTextFeedbackModal = () => {
    const inputLabelsText = [
      {
        stateKey: "mostValuableFeature",
        label: "Which features are the most valuable to you?",
      },
      {
        stateKey: "whatWouldChange",
        label:
          "If you could change one thing about FightPandemics, what would it be?",
      },
      { stateKey: "generalFeedback", label: "Any other feedback for us?" },
    ];

    return (
      <TextFeedbackModal
        afterClose={() => closeTextFeedbackModal}
        maskClosable={true}
        closable={true}
        visible={textFeedbackModal}
        onClose={() => closeTextFeedbackModal()}
        transparent
      >
        <h2 className="title">
          Thank you for being an early user of FightPandemics!
        </h2>
        {inputLabelsText.map((label, index) => (
          <StyledInput
            key={index}
            label={label.label}
            value={label.stateKey}
            onChange={dispatchAction}
          ></StyledInput>
        ))}
        <FeedbackSubmitButton
          title="Next"
          onClick={closeTextFeedbackModal}
        ></FeedbackSubmitButton>
      </TextFeedbackModal>
    );
  };

  const renderRatingModal = () => {
    const ratingScale = ["1", "2", "3", "4", "5"];

    return (
      <RatingModal
        maskClosable={true}
        closable={false}
        visible={ratingModal}
        transparent
      >
        <h3 className="title">How well does FightPandemics meet your needs?</h3>
        <div className="rectangle">
          {ratingScale.map((rating, index) => (
            <div key={index} onClick={() => closeRatingModal(rating)}>
              {rating}
            </div>
          ))}
        </div>
        <div className="scale-text">
          <div>Poorly</div>
          <div className="spacer"></div>
          <div>Very well</div>
        </div>
      </RatingModal>
    );
  };

  const AuthenticatedMenu = () => (
    <>
      <WhiteSpace size="lg" />
      <AvatarContainer>
        <NavItem history={history}>
          <TextAvatar size={80} alt="avatar">
            {displayInitials(user)}
          </TextAvatar>
        </NavItem>
        <UserName>{displayFullName(user)}</UserName>
      </AvatarContainer>
      <DividerLine />
      <NavItem history={history}>
        <Link to="/profile">Profile</Link>
      </NavItem>
      <NavItem>
        <Link to="">Organization</Link>
      </NavItem>
      <NavItemBrief history={history}>
        <a href={NOTION_URL}>Notion</a>
      </NavItemBrief>
      <NavItem history={history}>
        <Link to="/feed">Feed</Link>
      </NavItem>
      <NavItem history={history}> 
        <Link to="/about-us">About Us</Link>
      </NavItem>
      <Space height="12rem" />
      <NavItem history={history}>
        <BriefLink to="/auth/logout">Logout</BriefLink>
      </NavItem>
    </>
  );

  const UnAuthenticatedMenu = () => (
    <>
      <NavItem history={history}>
        <Link to="/auth/login">Login / Register</Link>
      </NavItem>
      <NavItem history={history}>
        <Link to="/about-us">About Us</Link>
      </NavItem>
      <NavItem
        size={"small"}
        margin={"8rem 0 0"}
        onClick={() => setModal({ ratingModal: true })}
      >
        Feedback
      </NavItem>
        <NavItem
          size={"small"}
          margin={"8rem 0 0"}
          onClick={() => dispatchAction(TOGGLE_STATE, "ratingModal")}
        >
          Feedback
        </NavItem>
      {drawerOpened && <CloseNav onClick={toggleDrawer} />}
    </>
  );

  const DrawerMenu = () => (
    <MenuContainer>
      {drawerOpened && <CloseNav onClick={toggleDrawer} />}
      <NavList>
        {isAuthenticated ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />}
      </NavList>
    </MenuContainer>
  );

  const renderNavigationBar = () => {
    return (
      <div>
        <Drawer
          style={{
            minHeight: document.documentElement.clientHeight,
            ...drawerStyles,
          }}
          enableDragHandle
          open={drawerOpened}
          onOpenChange={toggleDrawer}
          position="right"
          sidebar={DrawerMenu()}
          sidebarStyle={sidebarStyle}
          className="app-drawer"
        >
          <Header
            onMenuClick={toggleDrawer}
            isAuthenticated={isAuthenticated}
            onFeedbackIconClick={() =>
              dispatchAction(TOGGLE_STATE, "ratingModal")
            }
          />
          {mobiletabs ? (
            <MobileTabs tabIndex={tabIndex} childComponent={props.children} />
          ) : null}
          <Main>
            <props.component {...props} />
            {renderRatingModal()}
            {renderTextFeedbackModal()}
            {renderRadioModal()}
            {renderThanksModal()}
          </Main>
          <Footnote />
          <CookieAlert />
        </Drawer>
      </div>
    );
  };

  return <>{renderNavigationBar()}</>;
};

export default NavigationLayout;
