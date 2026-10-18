export const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '0096c8c7-983a-4478-aaa5-e17cb0bab623'

export async function submitWeb3Form(values: Record<string, FormDataEntryValue | string>) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...values, access_key: web3FormsAccessKey }),
  })
  const result = await response.json() as { success?: boolean; message?: string }
  if (!response.ok || !result.success) throw new Error(result.message || 'Unable to submit the form. Please try again.')
}
