"use client";

import { mockServer } from "@/components/config/mockServer";
import Search from "@/components/molecules/Search";
import FormDashboard from "@/components/organisms/FormDashboard";
import Listing from "@/components/organisms/Listing";
import {
  ItemListType,
  OrderItemsHeaderList,
  Templateform,
} from "@/types/general";
import React from "react";
import { useHandlerForm } from "@/hooks/use-hanlder-form";

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
}: PropTemplates) => {
  const {
    register: registerS,
    handleSubmit: handleSubmitS,
    errors: errorsS,
  } = useHandlerForm(templates?.templateformSearch?.sections, getDefaultValues);

  return (
    <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
      {templates?.templateform && (
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            title={titleForm}
            loading={!values}
            handlerForm={handleRegister}
            templateform={templates?.templateform}
            getDefaultValues={getDefaultValues}
          />
        </div>
      )}
      {list && (
        <>
          {handlerFormSearch && (
            <div className="w-full mt-6">
              <Search
                handlerForm={handleSubmitS(handlerFormSearch)}
                register={registerS}
              />
            </div>
          )}
          <div className="w-full mt-6 lg:mt-8 mb-4">
            <Listing
              itemsHeader={templates?.orderItemsHeaderList?.itemsHeader}
              avatar={renderAvatar}
              list={list}
              listActions={mockServer.listActionsConfirmedLeads}
              hrefButton="dashboard/leads/register"
              textButton=""
              title={`Leads`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailDefault;
