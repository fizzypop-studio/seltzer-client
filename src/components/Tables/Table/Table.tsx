import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Table as MUITable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	TableProps as MUITableProps,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Box } from 'components';
import * as S from './Table.styles';

type Order = 'asc' | 'desc';

type TableProps = MUITableProps & {
	columns: Array<unknown>;
	rows: readonly {
		[x: string]: string | number;
		[x: number]: string | number;
		[x: symbol]: string | number;
	}[];
	navigationUrl?: string;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export const Table = ({ columns, rows, navigationUrl = '' }: TableProps) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<keyof any>('');
	const navigate = useNavigate();

	function handleRequestSort(
		event: React.MouseEvent<unknown>,
		property: keyof any
	) {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	}

	const createSortHandler =
		(property: keyof any) => (event: React.MouseEvent<unknown>) => {
			handleRequestSort(event, property);
		};

	function handleChangePage(event: unknown, newPage: number) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}

	return (
		<S.Wrapper>
			<TableContainer sx={{ maxHeight: 440 }}>
				<MUITable stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column: any) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									sortDirection={
										orderBy === column.id ? order : false
									}
								>
									<TableSortLabel
										active={orderBy === column.id}
										direction={
											orderBy === column.id
												? order
												: 'asc'
										}
										onClick={createSortHandler(column.id)}
									>
										{column.label}
										{orderBy === column.id ? (
											<Box
												component="span"
												sx={visuallyHidden}
											>
												{order === 'desc'
													? 'sorted descending'
													: 'sorted ascending'}
											</Box>
										) : null}
									</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{stableSort(rows, getComparator(order, orderBy))
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row: any) => {
								return (
									<TableRow
										hover
										className="table-row"
										role="checkbox"
										tabIndex={-1}
										key={row.id}
										onClick={
											navigationUrl
												? () =>
														navigate(
															`${navigationUrl}/${row.id}`
														)
												: (e) => e.preventDefault()
										}
									>
										{columns.map((column: any) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{column.format &&
													typeof value === 'number'
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</MUITable>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</S.Wrapper>
	);
};
