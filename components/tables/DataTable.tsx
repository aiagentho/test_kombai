'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GetAppIcon from '@mui/icons-material/GetApp';
import { formatCurrency, formatDate, formatPaymentStatus } from '../../utils/formatters';
import { PaymentStatus } from '../../types/enums';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.grey[900],
    fontWeight: 600,
  },
}));

interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description: string;
  date: string;
  invoiceUrl: string;
}

interface DataTableProps {
  data: PaymentRecord[];
  title?: string;
  onDownload?: (record: PaymentRecord) => void;
  onView?: (record: PaymentRecord) => void;
}

export default function DataTable({ data, title = "Payment History", onDownload, onView }: DataTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRecord, setSelectedRecord] = useState<PaymentRecord | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, record: PaymentRecord) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const handleDownload = () => {
    if (selectedRecord && onDownload) {
      onDownload(selectedRecord);
    }
    handleMenuClose();
  };

  const handleView = () => {
    if (selectedRecord && onView) {
      onView(selectedRecord);
    }
    handleMenuClose();
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.COMPLETED:
        return 'success';
      case PaymentStatus.PENDING:
        return 'warning';
      case PaymentStatus.FAILED:
        return 'error';
      case PaymentStatus.CANCELLED:
        return 'default';
      default:
        return 'default';
    }
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {title}
      </Typography>
      
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((record) => (
              <TableRow key={record.id} hover>
                <StyledTableCell>
                  <Typography variant="body2">
                    {formatDate(new Date(record.date))}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {record.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ID: {record.id}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {formatCurrency(record.amount, record.currency)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    label={formatPaymentStatus(record.status)}
                    color={getStatusColor(record.status)}
                    size="small"
                    variant="filled"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, record)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: `1px solid ${(theme) => theme.palette.divider}`,
            '& .MuiTablePagination-toolbar': {
              px: 2,
            },
          }}
        />
      </StyledTableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleView}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">View Details</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <Stack direction="row" spacing={1} alignItems="center">
            <GetAppIcon fontSize="small" />
            <Typography variant="body2">Download Invoice</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
}