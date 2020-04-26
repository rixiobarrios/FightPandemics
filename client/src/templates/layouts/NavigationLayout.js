import { Drawer, List, Button, Flex, WhiteSpace } from "antd-mobile";
import { Typography } from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { getInitials } from "utils/userInfo";
import TextAvatar from "components/TextAvatar";
import Avatar from "components/Avatar";
import Header from "components/Header";
import FeedbackSubmitButton from "components/Button/FeedbackModalButton";
import Footnote from "components/Footnote";
import CookieAlert from "components/CookieAlert";
import RatingModal from "components/Feedback/RatingModal";
import StyledInput from "components/StepWizard/StyledTextInput";
import TextFeedbackModal from "components/Feedback/TextFeedbackModal";
import withLabel from "components/Input/with-label";
import Main from "./Main";
import MobileTabs from "./MobileTabs";
import { theme } from "constants/theme";

const NOTION_URL =
  "https://www.notion.so/fightpandemics/FightPandemics-Overview-cd01dcfc05f24312ac454ac94a37eb5e";

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

const CloseNav = styled(Button).attrs((props) => ({
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
  const [modal, setModal] = useState([
    { ratingModal: false },
    { textFeedbackModal: false },
  ]);
  const [rating, setRating] = useState(null);

  const displayInitials = (user) => {
    if (user?.firstName && user?.lastName) {
      const userinitials = getInitials(user.firstName, user.lastName);
      return <AvatarInitials>{userinitials}</AvatarInitials>;
    }
  };

  const displayFullName = (user) =>
    user ? `${user?.firstName} ${user?.lastName}` : "";

  const [ratingModal, setRatingModal] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const closeRatingModal = (rating) => {
    if (drawerOpened) {
      toggleDrawer();
    }

    setModal({ ratingModal: false });

    if (modal.ratingModal) {
      setRating(rating);
      setModal({ textFeedbackModal: true });
    }
  };

  const closeTextFeedbackModal = () => {
    setModal({ ratitextFeedbackModalngModal: false });
  };

  const renderTextFeedbackModal = () => {
    const inputLabelsText = [
      "Which features are the most valuable to you?",
      "If you could change one thing about FightPandemics, what would it be?",
      "Any other feedback for us?",
    ];

    const InputWithLabel = withLabel(() => <StyledInput></StyledInput>);

    return (
      <TextFeedbackModal
        afterClose={() => closeTextFeedbackModal}
        maskClosable={true}
        closable={true}
        visible={modal.textFeedbackModal}
        onClose={() => closeTextFeedbackModal()}
        transparent
      >
        <h2 className="title">
          Thank you for being an early user of FightPandemics!
        </h2>
        {inputLabelsText.map((labelText, index) => (
          <InputWithLabel key={index} label={labelText}></InputWithLabel>
        ))}
        <FeedbackSubmitButton title="Next"></FeedbackSubmitButton>
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
          />
          {mobiletabs ? (
            <MobileTabs tabIndex={tabIndex} childComponent={props.children} />
          ) : null}
          <Main>
            <props.component {...props} />
            {renderRatingModal()}
            {renderTextFeedbackModal()}
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
