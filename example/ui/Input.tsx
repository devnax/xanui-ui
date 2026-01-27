import React, { useEffect, useRef, useState } from 'react'
import Stack from '../../src/Stack'
import Input from '../../src/Input'
import IconButton from '../../src/IconButton'
import InputNumber from '../../src/InputNumber'
import Autocomplete from '../../src/Autocomplete'
import SendIcon from '@xanui/icons/Send'
import SearchIcon from '@xanui/icons/Search'
import Section from '../Layout/Section'
import ListItem from '../../src/ListItem'

const Inputs = () => {
    const [v, setV] = useState('')
    const ref = useRef<any>(null);
    const [value, setValue] = useState()
    const [num, setNum] = useState()

    return (
        <Stack gap={2} width={400}>
            <Section title="Autocomplete" gap={2}>
                <Autocomplete
                    options={async (text: string) => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                let opts = [
                                    { label: 'Apple' },
                                    { label: 'Banana' },
                                    { label: 'Cherry' },
                                    { label: 'Date' },
                                    { label: 'Elderberry' },
                                    { label: 'Fig' },
                                    { label: 'Grape' },
                                    { label: 'Honeydew' },
                                    { label: 'Indian Fig' },
                                    { label: 'Jackfruit' },
                                    { label: 'Kiwi' },
                                    { label: 'Lemon' },
                                    { label: 'Mango' },
                                    { label: 'Nectarine' },
                                    { label: 'Orange' },
                                    { label: 'Papaya' },
                                    { label: 'Quince' },
                                    { label: 'Raspberry' },
                                    { label: 'Strawberry' },
                                    { label: 'Tangerine' },
                                    { label: 'Ugli Fruit' },
                                    { label: 'Vanilla' },
                                    { label: 'Watermelon' },
                                ]

                                if (text) {
                                    opts = opts.filter(o => o.label.toLowerCase().includes(text.toLowerCase()))
                                }
                                resolve(opts)
                            }, 1000)
                        })

                    }}
                    multiple
                    getLabel={(option) => option.label}
                    value={value}
                    onChange={(val) => setValue(val)}
                    renderOption={(option, props) => <ListItem {...props}>{option.label}</ListItem>}
                />
            </Section>
            <Section title="Basic" gap={2}>
                <InputNumber
                    ref={ref}
                    endIcon={<SendIcon />}
                    placeholder='Write a message...'
                    name="email"
                    value={num}
                    onChange={e => setNum(e.target.value)}
                />

            </Section>
            <Section title="Basic" gap={2}>
                <Input
                    ref={ref}
                    endIcon={<SendIcon />}
                    placeholder='Write a message...'
                    name="email"
                    autoFocus
                />
                <Input
                    variant='outline'
                    startIcon={<SearchIcon />}
                    endIcon={<SendIcon />}
                />
            </Section>
            <Section title="Size" gap={2}>
                <Input
                    size="small"
                    endIcon={<SendIcon />}
                />
                <Input
                    size="medium"
                    endIcon={<SendIcon />}
                />
                <Input
                    size="large"
                    endIcon={<SendIcon />}
                />
            </Section>
            <Section title="Error" gap={2}>
                <Input
                    size="small"
                    endIcon={<SendIcon />}
                    error
                />
                <Input
                    size="medium"
                    endIcon={<SendIcon />}
                    error
                    helperText='Please fill this box'
                />
                <Input
                    size="large"
                    endIcon={<SendIcon />}
                />
            </Section>
            <Section title="Disabled" gap={2}>
                <Input
                    size="medium"
                    endIcon={<SendIcon />}
                    disabled
                />
            </Section>
            <Section title="Multiline" gap={2}>
                <Input
                    size="medium"
                    endIcon={<IconButton variant='text'><SendIcon /></IconButton>}
                    multiline
                    value={v}
                    placeholder='Type a message...'
                    onChange={(nv: any) => {
                        setV(nv.target.value)
                    }}
                />
            </Section>
        </Stack>
    )
}

export default Inputs