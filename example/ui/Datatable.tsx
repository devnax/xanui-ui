import React from 'react'
import Section from '../Layout/Section'
import Stack from '../../src/Stack'
import Datatable from '../../src/Datatable'
import DataFilter from '../../src/DataFilter'
import DeleteIcon from '@xanui/icons/Delete'


const rows = [
    { id: 1, name: "Najrul Ahmed", email: "najrul@gmail.com" },
    { id: 2, name: "Jubayer", email: "jubayer@gmail.com" },
    { id: 3, name: "Jhon Deo", email: "jhon@gmail.com" },
    { id: 4, name: "Saad Ahmed", email: "saad@gmail.com" },
    { id: 5, name: "Mohammad Waqiu", email: "waqui@gmail.com" },
]

const Tb = () => {
    return (
        <Stack gap={2}>
            <DataFilter
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
                    { type: "multi-select", key: "role", label: "Role", options: [{ label: "Admin", value: "admin" }, { label: "User", value: "user" }] },
                    { type: "multi-select", key: "source", label: "Source", options: [{ label: "Google", value: "google" }, { label: "Facebook", value: "facebook" }] },
                    { type: "multi-select", key: "category", label: "Category", options: [{ label: "A", value: "a" }, { label: "B", value: "b" }] },
                ]}
            />
            <Datatable
                compact
                // skeleton={30}
                filters={{
                    Status: [
                        { label: "Active", value: "active" },
                        { label: "Deactive", value: "deactive" },
                    ],
                    Role: [
                        { label: "Admin", value: "admin" },
                        { label: "User", value: "user" },
                    ],
                    Source: [
                        { label: "Google", value: "google" },
                        { label: "Facebook", value: "facebook" },
                    ],
                    Category: [
                        { label: "A", value: "a" },
                        { label: "B", value: "b" },
                    ]
                }}
                onStateChange={state => {

                }}
                rows={rows as any}
                columns={[
                    { label: "Name", field: "name", sortable: true },
                    { label: "Email", field: "email", sortable: true },
                ]}
                tabs={[
                    { label: "All" },
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