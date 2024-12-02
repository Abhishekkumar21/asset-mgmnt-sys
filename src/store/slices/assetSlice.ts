import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Asset, AssetRequest, AuditRequest } from '../../types';
import { assetService } from '../../services/assetService';
import type { PaginatedResponse } from '../../services/assetService';
import { message } from 'antd';

interface AssetState {
  assets: Asset[];
  userAssets: Asset[];
  assetRequests: AssetRequest[];
  auditRequests: AuditRequest[];
  categories: string[];
  loading: boolean;
  error: string | null;
  totalAssets: number;
  currentPage: number;
  pageSize: number;
}

const initialState: AssetState = {
  assets: [],
  userAssets: [],
  assetRequests: [],
  auditRequests: [],
  categories: [],
  loading: false,
  error: null,
  totalAssets: 0,
  currentPage: 1,
  pageSize: 10,
};

// Async thunks
export const fetchAssets = createAsyncThunk<
  PaginatedResponse<Asset>,
  {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    status?: Asset['status'];
  }
>('assets/fetchAssets', async (params) => {
  try {
    return await assetService.getAllAssets(params);
  } catch (error) {
    message.error('Failed to fetch assets');
    throw error;
  }
});

export const fetchUserAssets = createAsyncThunk(
  'assets/fetchUserAssets',
  async () => {
    try {
      const assets = await assetService.getEmployeeAssets();
      return assets;
    } catch (error) {
      message.error('Failed to fetch your assets');
      throw error;
    }
  }
);

export const createAssetRequest = createAsyncThunk(
  'assets/createAssetRequest',
  async (request: Omit<AssetRequest, 'id' | 'status' | 'requestDate'>) => {
    try {
      const response = await assetService.createAssetRequest(request);
      message.success('Asset request created successfully');
      return response;
    } catch (error) {
      message.error('Failed to create asset request');
      throw error;
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'assets/fetchCategories',
  async () => {
    try {
      const categories = await assetService.getAssetCategories();
      return categories;
    } catch (error) {
      message.error('Failed to fetch asset categories');
      throw error;
    }
  }
);

const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Assets
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.items;
        state.totalAssets = action.payload.total;
        state.currentPage = action.payload.page;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      // Fetch User Assets
      .addCase(fetchUserAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.userAssets = action.payload;
      })
      .addCase(fetchUserAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user assets';
      })
      // Create Asset Request
      .addCase(createAssetRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssetRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.assetRequests = [...state.assetRequests, action.payload];
      })
      .addCase(createAssetRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create asset request';
      })
      // Fetch Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setCurrentPage, setPageSize } = assetSlice.actions;
export default assetSlice.reducer;
