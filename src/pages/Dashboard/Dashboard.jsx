import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Pagination from '@mui/material/Pagination'
import AppBar from '~/components/AppBar/AppBar'
import { selectCurrentUser } from '~/redux/user/userSlice'
import {
  selectExamples,
  selectExampleMeta,
  getExamplesThunk,
  createExampleThunk,
  updateExampleThunk,
  deleteExampleThunk
} from '~/redux/example/exampleSlice'
import { useDebounceFn } from '~/CustomHooks/useDebounceFn'
import { useConfirm } from 'material-ui-confirm'
import { socketIoInstance } from '~/sockets/socketClient'
import { toast } from 'react-toastify'

// Icons
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import SecurityIcon from '@mui/icons-material/Security'

function Dashboard() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const items = useSelector(selectExamples)
  const meta = useSelector(selectExampleMeta)
  const confirm = useConfirm()

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Dialog State
  const [openModal, setOpenModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', status: 'active' })

  // Socket room join
  useEffect(() => {
    if (currentUser?._id) {
      socketIoInstance.emit('FE_USER_JOIN_ROOM', currentUser._id)

      const handleReceiveNotification = (data) => {
        toast.info(data.message || 'New notification received!')
      }

      socketIoInstance.on('BE_RECEIVE_NOTIFICATION', handleReceiveNotification)

      return () => {
        socketIoInstance.off('BE_RECEIVE_NOTIFICATION', handleReceiveNotification)
      }
    }
  }, [currentUser?._id])

  // Fetch items
  const fetchItems = (query, page) => {
    dispatch(getExamplesThunk({ q: query, page, itemsPerPage: 6 }))
  }

  const debouncedSearch = useDebounceFn((val) => {
    setCurrentPage(1)
    fetchItems(val, 1)
  }, 400)

  useEffect(() => {
    fetchItems(searchTerm, currentPage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleOpenCreate = () => {
    setEditingItem(null)
    setFormData({ title: '', description: '', status: 'active' })
    setOpenModal(true)
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setFormData({ title: item.title, description: item.description || '', status: item.status || 'active' })
    setOpenModal(true)
  }

  const handleSubmitModal = () => {
    if (!formData.title.trim()) return

    if (editingItem) {
      dispatch(updateExampleThunk({ id: editingItem._id, data: formData }))
    } else {
      dispatch(createExampleThunk(formData))
    }
    setOpenModal(false)
  }

  const handleDeleteItem = (id) => {
    confirm({
      title: 'Delete this item?',
      description: 'This action will soft-delete the record.',
      confirmationText: 'Delete',
      cancellationText: 'Cancel'
    }).then(() => {
      dispatch(deleteExampleThunk(id))
    }).catch(() => {})
  }

  const handleTestSocketNotification = () => {
    socketIoInstance.emit('FE_SEND_NOTIFICATION', {
      recipientId: currentUser._id,
      message: `🔔 Socket test notification triggered at ${new Date().toLocaleTimeString()}!`
    })
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', pb: 8 }}>
      <AppBar />

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {/* Welcome & Session Card */}
        <Card sx={{ mb: 4, p: 1, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} gap={2}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                  Welcome back, {currentUser?.displayName || currentUser?.username}!
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <SecurityIcon sx={{ fontSize: 18, color: 'success.main' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Dual-Auth Session Active (Email: <b>{currentUser?.email}</b>, Role: <b>{currentUser?.role}</b>)
                  </Typography>
                </Stack>
              </Box>

              <Button
                variant="outlined"
                color="secondary"
                startIcon={<NotificationsActiveIcon />}
                onClick={handleTestSocketNotification}
                sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
              >
                Test Socket Alert
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Example CRUD Controls Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} gap={2} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Example Resource CRUD
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Blueprint demonstration of MongoDB Native Driver + Redux Toolkit
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <TextField
              size="small"
              placeholder="Search items..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
              }}
              sx={{ width: { xs: '100%', sm: 240 } }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              sx={{ whiteSpace: 'nowrap', fontWeight: 700 }}
            >
              Add Item
            </Button>
          </Stack>
        </Stack>

        {/* Items Grid */}
        <Grid container spacing={2.5}>
          {items.map((item) => (
            <Grid xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid',
                borderColor: 'divider',
                p: 1
              }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.3 }}>
                      {item.title}
                    </Typography>
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.status === 'active' ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, minHeight: 40 }}>
                    {item.description || 'No description provided.'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>

                <Stack direction="row" spacing={0.5} justifyContent="flex-end" sx={{ px: 2, pb: 1 }}>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => handleOpenEdit(item)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => handleDeleteItem(item._id)}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </Grid>
          ))}

          {items.length === 0 && !meta.isLoading && (
            <Grid xs={12}>
              <Card sx={{ p: 6, textAlign: 'center', border: '1px dashed', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                  No items found
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  Click &quot;Add Item&quot; to create your first record.
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
                  Create First Item
                </Button>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={meta.totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
            />
          </Box>
        )}
      </Container>

      {/* Create / Edit Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingItem ? 'Edit Item' : 'Create New Item'}
        </DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            autoFocus
            label="Title"
            fullWidth
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            select
            label="Status"
            fullWidth
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitModal} disabled={!formData.title.trim()}>
            {editingItem ? 'Save Changes' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Dashboard

