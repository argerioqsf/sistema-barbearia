"use client";

import { mockServer } from "@/components/config/mockServer";
import Search from "@/components/molecules/Search";
import FormDashboard from "@/components/organisms/FormDashboard";
import Listing from "@/components/organisms/Listing";
import {
  ItemListType,
  OrderItemsHeaderList,
  Templateform,
  TimeLine,
} from "@/types/general";
import React from "react";
import { useHandlerForm } from "@/hooks/use-hanlder-form";
import TimeLineComponent from "../TimeLineComponent";
import { ContainerDashboard } from "@/components/molecules";

type PropTemplates = {
  templates: {
    orderItemsHeaderList?: OrderItemsHeaderList;
    templateform?: Templateform;
    templateformSearch?: Templateform;
  };
  getDefaultValues?: () => Promise<any>;
  renderAvatar?: (item: ItemListType, index: number) => React.JSX.Element;
  handlerFormSearch?: (data: object) => void;
  handleRegister?: (data: any) => void;
  titleForm?: string;
  values?: any;
  list?: Array<any>;
  time_line?: TimeLine[];
};

const DetailDefault = ({
  templates,
  getDefaultValues,
  renderAvatar,
  handlerFormSearch = () => {},
  handleRegister,
  titleForm,
  values,
  list,
  time_line,
}: PropTemplates) => {
  const {
    register: registerS,
    handleSubmit: handleSubmitS,
    errors: errorsS,
  } = useHandlerForm(templates?.templateformSearch?.sections, getDefaultValues);

  return (
    <div className="w-full mt-6 lg:mt-8">
      {templates?.templateform && (
        <FormDashboard
          title={titleForm}
          loading={!values}
          handlerForm={handleRegister}
          templateform={templates?.templateform}
          getDefaultValues={getDefaultValues}
        />
      )}
      {list && (
        <>
          {handlerFormSearch && (
            <Search
              handlerForm={handleSubmitS(handlerFormSearch)}
              register={registerS}
            />
          )}
          <Listing
            itemsHeader={templates?.orderItemsHeaderList?.itemsHeader}
            avatar={renderAvatar}
            list={list}
            listActions={mockServer.listActionsConfirmedLeads}
            hrefButton="dashboard/leads/register"
            textButton=""
            title={`Leads`}
          />
        </>
      )}
      {time_line && <TimeLineComponent time_line={time_line} />}
    </div>
  );
};

export default DetailDefault;
