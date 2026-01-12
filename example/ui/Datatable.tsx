import React from 'react'
import Section from '../Layout/Section'
import Stack from '../../src/Stack'
import Datatable from '../../src/Datatable'
import DataFilter from '../../src/DataFilter'
import DeleteIcon from '@xanui/icons/Delete'
import Button from '../../src/Button'


const rows = [
    { id: 1, name: "Najrul Ahmed", email: "najrul@gmail.com" },
    { id: 2, name: "Jubayer", email: "jubayer@gmail.com" },
    { id: 3, name: "Jhon Deo", email: "jhon@gmail.com" },
    { id: 4, name: "Saad Ahmed", email: "saad@gmail.com" },
    { id: 5, name: "Mohammad Waqiu", email: "waqui@gmail.com" },
]

const Tb = () => {
    const [state, setState] = React.useState({})
    const [count, setCount] = React.useState(5);
    return (
        <Stack gap={2}>
            <Button onClick={() => {
                setCount(count + 5)
            }}>Load More Data</Button>
            {/* <DataFilter
                options={[
                    {
                        type: "multi-select", key: "status", label: "Status",
                        options: [
                            { label: "Active", value: "active" },
                            { label: "Deactive", value: "deactive" },
                            { label: "Suspend", value: "Suspend" },
                            { label: "Pending", value: "Pending" },
                        ]
                    },
                    { type: "select", key: "role", label: "Role", options: [{ label: "Admin", value: "admin" }, { label: "User", value: "user" }] },
                    { type: "number", key: "source", label: "Source" },
                    { type: "text", key: "text", label: "Text", },
                    { type: "number-range", key: "number-range", label: "Number Range" },
                    { type: "date", key: "date", label: "Date" },
                    { type: "date-range", key: "date-range", label: "Date Range" },
                ]}
            /> */}
            <Datatable
                compact
                // hideCheckbox
                // skeleton={30}
                state={state}
                onChange={state => {
                    // console.log("State Changed: ", state)
                    setState(state)
                }}

                filters={[
                    {
                        type: "multi-select", key: "status", label: "Status",
                        options: [
                            { label: "Active", value: "active" },
                            { label: "Deactive", value: "deactive" },
                            { label: "Suspend", value: "Suspend" },
                            { label: "Pending", value: "Pending" },
                        ]
                    },
                    { type: "select", key: "role", label: "Role", options: [{ label: "Admin", value: "admin" }, { label: "User", value: "user" }] },
                    { type: "number", key: "source", label: "Source" },
                    { type: "text", key: "text", label: "Text", },
                    { type: "number-range", key: "number-range", label: "Number Range" },
                    { type: "date", key: "date", label: "Date" },
                    { type: "date-range", key: "date-range", label: "Date Range" },
                ]}

                rows={rows}
                columns={[
                    { label: "Name", field: "name", sortable: true },
                    { label: "Email", field: "email", sortable: true },
                ]}
                tabs={[
                    { label: `All ${count}` },
                    { label: "Actives" },
                    { label: "Deactives" }
                ]}
                rowAction={(row) => {
                    return [
                        { label: "Delete", icon: <DeleteIcon /> }
                    ]
                }}
            />
        </Stack>
    )
}

const Tables = () => {

    return (
        <Stack gap={4}>
            <Section title="" gap={4}>
                <Tb
                />
            </Section>
        </Stack>
    )
}

export default Tables