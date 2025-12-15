import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, DialogActions, Button } from '@mui/material'
import type {Alert} from '../types/Alert'


interface Props {
    open: boolean
    onClose: () => void
    alert: Alert | null
}


export default function AlertDetailsModal({ open, onClose, alert }: Props) {
    const details = alert?.details || {}


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Détails de l'alerte</DialogTitle>


            <DialogContent>
                <List>
                    {Object.keys(details).length === 0 && (
                        <ListItem><ListItemText primary="Aucun détail" /></ListItem>
                    )}


                    {Object.entries(details).map(([k, v]) => (
                        <ListItem key={k} divider>
                            <ListItemText primary={k} secondary={String(v)} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>


            <DialogActions>
                <Button onClick={onClose}>Fermer</Button>
            </DialogActions>
        </Dialog>
    )
}