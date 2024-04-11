import FormDashboard from '@/components/organisms/FormDashboard'
import Listing from '@/components/organisms/Listing'
import { Form, InfoList, SchemaForm, TimeLine } from '@/types/general'
import React, { Fragment } from 'react'
import TimeLineComponent from '../TimeLineComponent'

type PropTemplates = {
  lists?: InfoList[]
  forms?: Form[]
  timeLine?: TimeLine[]
  schema: SchemaForm
}

const DetailDefault = ({ lists, timeLine, forms }: PropTemplates) => {
  return (
    <div className="w-full mt-6 lg:mt-8 grid gap-8">
      {forms &&
        forms?.length > 0 &&
        forms?.map((form, index) => (
          <FormDashboard
            key={index}
            title={form.template.title}
            templateForm={form.template}
            defaultValues={form.defaultValues}
            loading={form.loading}
            action={form.action}
            pathSuccess=""
            schemaName={'UpdateUnit'}
          />
        ))}
      {lists &&
        lists.map((list, idx) => (
          <Fragment key={idx}>
            {/* <Search errorRequest={list.errorRequest} /> */}
            <Listing
              infoList={list}
              list={null}
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
