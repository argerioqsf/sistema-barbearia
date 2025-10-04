import { Course, Segment, TemplateForm, Unit } from '@/types/general'
import { useState } from 'react'

export default function useRegisterUnit(
  template: TemplateForm<Unit | Course | Segment>,
) {
  const [templateForm] =
    useState<TemplateForm<Unit | Course | Segment>>(template)

  // TODO: refatorar para selecionar um segmento por vez e seus cursos
  async function listSegment(unit?: Unit) {
    console.log('RIP', unit)
  }

  return { templateForm, listSegment }
}
