'use client'

import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ZService } from '@/features/services/schemas'
import { CommissionCalcType } from '@/features/users/schemas'
import { ZProduct } from '@/features/products/schemas'

export interface ItemData {
  id: string
  commissionPercentage?: number
  commissionType?: CommissionCalcType
  time?: number
}

interface FormItemAssociationProps {
  items: (ZService | ZProduct)[]
  selectedItems: ItemData[]
  onItemsChange: (items: ItemData[]) => void
  itemType: 'service' | 'product'
}

export function FormItemAssociation({
  items,
  selectedItems,
  onItemsChange,
  itemType,
}: FormItemAssociationProps) {
  const handleCheckboxChange = (itemId: string, isChecked: boolean) => {
    if (isChecked) {
      onItemsChange([...selectedItems, { id: itemId }])
    } else {
      onItemsChange(selectedItems.filter((item) => item.id !== itemId))
    }
  }

  const handleFieldChange = (
    itemId: string,
    field: keyof ItemData,
    value: CommissionCalcType | number,
  ) => {
    onItemsChange(
      selectedItems.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item,
      ),
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox
            id={`item-${item.id}`}
            checked={selectedItems.some((sItem) => sItem.id === item.id)}
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange(item.id, checked)
            }
          />
          <Label htmlFor={`item-${item.id}`} className="flex-1">
            {item.name}
          </Label>

          {selectedItems.some((sItem) => sItem.id === item.id) && (
            <div className="flex items-center space-x-2">
              {itemType === 'service' && (
                <Input
                  type="number"
                  placeholder="Tempo (min)"
                  value={
                    selectedItems.find((sItem) => sItem.id === item.id)?.time ||
                    ''
                  }
                  onChange={(e) =>
                    handleFieldChange(item.id, 'time', Number(e.target.value))
                  }
                  className="w-24"
                />
              )}
              <Input
                type="number"
                placeholder="Comissão (%)"
                value={
                  selectedItems.find((sItem) => sItem.id === item.id)
                    ?.commissionPercentage || ''
                }
                onChange={(e) =>
                  handleFieldChange(
                    item.id,
                    'commissionPercentage',
                    Number(e.target.value),
                  )
                }
                className="w-28"
              />
              <Select
                value={
                  selectedItems.find((sItem) => sItem.id === item.id)
                    ?.commissionType || ''
                }
                onValueChange={(value: CommissionCalcType) =>
                  handleFieldChange(item.id, 'commissionType', value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de Comissão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENTAGE_OF_ITEM">% do Item</SelectItem>
                  <SelectItem value="PERCENTAGE_OF_USER">
                    % do Usuário
                  </SelectItem>
                  <SelectItem value="PERCENTAGE_OF_USER_ITEM">
                    % Usuário + Item
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
