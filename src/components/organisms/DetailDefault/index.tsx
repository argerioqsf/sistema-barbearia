'use client'

import Search from '@/components/molecules/Search'
import FormDashboard from '@/components/organisms/FormDashboard'
import Listing from '@/components/organisms/Listing'
import { Form, InfoList, ItemListType, TimeLine } from '@/types/general'
import React, { Fragment } from 'react'
import TimeLineComponent from '../TimeLineComponent'
import { searchUsers } from '@/actions/user'

type PropTemplates = {
  lists?: InfoList[]
  forms?: Form[]
  renderAvatar?: (item: ItemListType, index: number) => React.JSX.Element
  timeLine?: TimeLine[]
}

const DetailDefault = ({
  renderAvatar,
  lists,
  timeLine,
  forms,
}: PropTemplates) => {
  return (
    <div className="w-full mt-6 lg:mt-8 grid gap-8">
      {forms &&
        forms?.length > 0 &&
        forms?.map((form, index) => (
          <FormDashboard
            key={index}
            title={form.template.title}
            templateForm={form.template}
            getDefaultValues={form.getDefaultValues}
            loading={form.loading}
            action={form.action}
            pathSuccess=""
            schema={form.schema}
          />
        ))}
      {lists &&
        lists.map((list, idx) => (
          <Fragment key={idx}>
            <Search action={searchUsers} />
            <Listing
              itemsHeader={list?.itemsHeader}
              avatar={renderAvatar}
              list={list?.list}
              listActions={list?.listActions}
              hrefButton={list?.hrefButton}
              textButton={list?.textButton}
              title={list?.title}
            />
          </Fragment>
        ))}
      {timeLine && <TimeLineComponent timeLine={timeLine} />}
    </div>
  )
}

export default DetailDefault
