// components/DynamicModelInput.tsx
import React from 'react'
import { StringInputProps, useFormValue } from 'sanity'
import { BRAND_MODELS_MAP } from '../schemaTypes/brandData'

export function DynamicModelInput(props: StringInputProps) {
  // 1. Read the currently selected 'brand' from the form document
  const selectedBrand = useFormValue(['brand']) as string | undefined

  // 2. Fetch the corresponding array of models for that brand
  const availableModels = selectedBrand ? BRAND_MODELS_MAP[selectedBrand] || [] : []

  // 3. Format models into Sanity selection objects [{title, value}]
  const modelOptions = availableModels.map((modelName) => ({
    title: modelName,
    value: modelName,
  }))

  // 4. Inject dynamically updated list options into the field
  const updatedProps = {
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {
        ...props.schemaType.options,
        list: modelOptions,
      },
    },
  }

  // Render Sanity's default select input using the dynamic options
  return props.renderDefault(updatedProps)
}