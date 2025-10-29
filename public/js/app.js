document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const itemForm = document.getElementById('itemForm');
    const itemsTableBody = document.getElementById('itemsTableBody');
    const noDataMessage = document.getElementById('noDataMessage');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const resetFormBtn = document.getElementById('resetForm');
    const refreshDataBtn = document.getElementById('refreshData');
    const itemIdInput = document.getElementById('itemId');
    const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
    const detailModalBody = document.getElementById('detailModalBody');
    const toastNotification = new bootstrap.Toast(document.getElementById('toastNotification'));
    const toastMessage = document.getElementById('toastMessage');
    const rangeInput = document.getElementById('rangeInput');
    const rangeValue = document.getElementById('rangeValue');
    const colorInput = document.getElementById('colorInput');
    const colorText = document.getElementById('colorText');
    
    // API Base URL
    const API_URL = '/api';
    
    // Initialize
    fetchItems();
    
    // Event Listeners
    itemForm.addEventListener('submit', handleSubmit);
    resetFormBtn.addEventListener('click', resetForm);
    refreshDataBtn.addEventListener('click', fetchItems);
    
    // Range input event
    rangeInput.addEventListener('input', function() {
        rangeValue.textContent = this.value;
    });
    
    // Color input event
    colorInput.addEventListener('input', function() {
        colorText.value = this.value;
    });
    
    // Fetch all items
    function fetchItems() {
        showLoading();
        
        fetch(`${API_URL}/items`)
            .then(response => response.json())
            .then(data => {
                hideLoading();
                if (data.success) {
                    renderItemsTable(data.data);
                } else {
                    showToast('Gagal memuat data: ' + data.message, 'danger');
                }
            })
            .catch(error => {
                hideLoading();
                showToast('Error: ' + error.message, 'danger');
                console.error('Error fetching items:', error);
            });
    }
    
    // Render items table
    function renderItemsTable(items) {
        if (items.length === 0) {
            itemsTableBody.innerHTML = '';
            noDataMessage.classList.remove('d-none');
            return;
        }
        
        noDataMessage.classList.add('d-none');
        
        itemsTableBody.innerHTML = items.map(item => `
            <tr>
                <td>${item.id.substring(0, 8)}...</td>
                <td>${item.textInput || '-'}</td>
                <td>${item.emailInput || '-'}</td>
                <td>${item.radioInput || '-'}</td>
                <td>${Array.isArray(item.checkboxInput) ? item.checkboxInput.join(', ') : (item.checkboxInput || '-')}</td>
                <td>${item.selectInput || '-'}</td>
                <td>${item.dateInput || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-info btn-action me-1" onclick="viewItem('${item.id}')">
                        <i class="bi bi-eye"></i> Lihat
                    </button>
                    <button class="btn btn-sm btn-warning btn-action me-1" onclick="editItem('${item.id}')">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger btn-action" onclick="deleteItem('${item.id}')">
                        <i class="bi bi-trash"></i> Hapus
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        
        const formData = getFormData();
        const itemId = itemIdInput.value;
        const isEdit = itemId !== '';
        
        const url = isEdit ? `${API_URL}/items/${itemId}` : `${API_URL}/items`;
        const method = isEdit ? 'PUT' : 'POST';
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Menyimpan...';
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Simpan';
            
            if (data.success) {
                showToast(isEdit ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!', 'success');
                resetForm();
                fetchItems();
            } else {
                showToast('Gagal menyimpan data: ' + data.message, 'danger');
            }
        })
        .catch(error => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Simpan';
            showToast('Error: ' + error.message, 'danger');
            console.error('Error saving item:', error);
        });
    }
    
    // Get form data
    function getFormData() {
        // Get checkbox values
        const checkboxes = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            checkboxes.push(checkbox.value);
        });
        
        // Get multi-select values
        const multiSelect = Array.from(document.getElementById('multiSelectInput').selectedOptions)
            .map(option => option.value);
        
        // Get file name (in a real app, you would upload the file)
        const fileInput = document.getElementById('fileInput');
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
        
        return {
            textInput: document.getElementById('textInput').value,
            passwordInput: document.getElementById('passwordInput').value,
            emailInput: document.getElementById('emailInput').value,
            numberInput: parseInt(document.getElementById('numberInput').value) || 0,
            telInput: document.getElementById('telInput').value,
            urlInput: document.getElementById('urlInput').value,
            searchInput: document.getElementById('searchInput').value,
            radioInput: document.querySelector('input[name="radioInput"]:checked')?.value || '',
            checkboxInput: checkboxes,
            selectInput: document.getElementById('selectInput').value,
            multiSelectInput: multiSelect,
            dateInput: document.getElementById('dateInput').value,
            timeInput: document.getElementById('timeInput').value,
            datetimeInput: document.getElementById('datetimeInput').value,
            monthInput: document.getElementById('monthInput').value,
            weekInput: document.getElementById('weekInput').value,
            rangeInput: parseInt(document.getElementById('rangeInput').value) || 0,
            colorInput: document.getElementById('colorInput').value,
            fileInput: fileName,
            textareaInput: document.getElementById('textareaInput').value
        };
    }
    
    // Reset form
    function resetForm() {
        itemForm.reset();
        itemIdInput.value = '';
        formTitle.textContent = 'Form Tambah Data';
        submitBtn.textContent = 'Simpan';
        rangeValue.textContent = '50';
        colorText.value = '';
    }
    
    // View item details
    window.viewItem = function(id) {
        fetch(`${API_URL}/items/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    renderItemDetails(data.data);
                    detailModal.show();
                } else {
                    showToast('Gagal memuat detail: ' + data.message, 'danger');
                }
            })
            .catch(error => {
                showToast('Error: ' + error.message, 'danger');
                console.error('Error fetching item details:', error);
            });
    };
    
    // Render item details
    function renderItemDetails(item) {
        detailModalBody.innerHTML = `
            <div class="detail-row">
                <div class="detail-label">ID:</div>
                <div class="detail-value">${item.id}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Text Input:</div>
                <div class="detail-value">${item.textInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${item.emailInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Number:</div>
                <div class="detail-value">${item.numberInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Telephone:</div>
                <div class="detail-value">${item.telInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">URL:</div>
                <div class="detail-value">${item.urlInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Search:</div>
                <div class="detail-value">${item.searchInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Radio:</div>
                <div class="detail-value">${item.radioInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Checkbox:</div>
                <div class="detail-value">${Array.isArray(item.checkboxInput) ? item.checkboxInput.join(', ') : (item.checkboxInput || '-')}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Select:</div>
                <div class="detail-value">${item.selectInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Multi Select:</div>
                <div class="detail-value">${Array.isArray(item.multiSelectInput) ? item.multiSelectInput.join(', ') : (item.multiSelectInput || '-')}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Date:</div>
                <div class="detail-value">${item.dateInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Time:</div>
                <div class="detail-value">${item.timeInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">DateTime:</div>
                <div class="detail-value">${item.datetimeInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Month:</div>
                <div class="detail-value">${item.monthInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Week:</div>
                <div class="detail-value">${item.weekInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Range:</div>
                <div class="detail-value">${item.rangeInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Color:</div>
                <div class="detail-value">
                    ${item.colorInput ? `
                        <div class="d-flex align-items-center">
                            <div style="width: 30px; height: 30px; background-color: ${item.colorInput}; border: 1px solid #ccc; margin-right: 10px;"></div>
                            ${item.colorInput}
                        </div>
                    ` : '-'}
                </div>
            </div>
            <div class="detail-row">
                <div class="detail-label">File:</div>
                <div class="detail-value">${item.fileInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Textarea:</div>
                <div class="detail-value">${item.textareaInput || '-'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Created At:</div>
                <div class="detail-value">${new Date(item.createdAt).toLocaleString()}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Updated At:</div>
                <div class="detail-value">${new Date(item.updatedAt).toLocaleString()}</div>
            </div>
        `;
    }
    
    // Edit item
    window.editItem = function(id) {
        fetch(`${API_URL}/items/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    populateForm(data.data);
                    formTitle.textContent = 'Form Edit Data';
                    submitBtn.textContent = 'Update';
                    
                    // Scroll to form
                    document.getElementById('itemForm').scrollIntoView({ behavior: 'smooth' });
                } else {
                    showToast('Gagal memuat data untuk edit: ' + data.message, 'danger');
                }
            })
            .catch(error => {
                showToast('Error: ' + error.message, 'danger');
                console.error('Error fetching item for edit:', error);
            });
    };
    
    // Populate form with item data
    function populateForm(item) {
        itemIdInput.value = item.id;
        document.getElementById('textInput').value = item.textInput || '';
        document.getElementById('passwordInput').value = item.passwordInput || '';
        document.getElementById('emailInput').value = item.emailInput || '';
        document.getElementById('numberInput').value = item.numberInput || '';
        document.getElementById('telInput').value = item.telInput || '';
        document.getElementById('urlInput').value = item.urlInput || '';
        document.getElementById('searchInput').value = item.searchInput || '';
        
        // Radio buttons
        if (item.radioInput) {
            document.querySelector(`input[name="radioInput"][value="${item.radioInput}"]`).checked = true;
        }
        
        // Checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        if (Array.isArray(item.checkboxInput)) {
            item.checkboxInput.forEach(value => {
                const checkbox = document.querySelector(`input[type="checkbox"][value="${value}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        // Selects
        document.getElementById('selectInput').value = item.selectInput || '';
        
        // Multi-select
        document.getElementById('multiSelectInput').selectedIndex = -1;
        if (Array.isArray(item.multiSelectInput)) {
            item.multiSelectInput.forEach(value => {
                const option = document.querySelector(`#multiSelectInput option[value="${value}"]`);
                if (option) option.selected = true;
            });
        }
        
        // Date and time inputs
        document.getElementById('dateInput').value = item.dateInput || '';
        document.getElementById('timeInput').value = item.timeInput || '';
        document.getElementById('datetimeInput').value = item.datetimeInput || '';
        document.getElementById('monthInput').value = item.monthInput || '';
        document.getElementById('weekInput').value = item.weekInput || '';
        
        // Range
        document.getElementById('rangeInput').value = item.rangeInput || 50;
        rangeValue.textContent = item.rangeInput || 50;
        
        // Color
        document.getElementById('colorInput').value = item.colorInput || '#000000';
        colorText.value = item.colorInput || '#000000';
        
        // Textarea
        document.getElementById('textareaInput').value = item.textareaInput || '';
    }
    
    // Delete item
    window.deleteItem = function(id) {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            fetch(`${API_URL}/items/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast('Data berhasil dihapus!', 'success');
                    fetchItems();
                } else {
                    showToast('Gagal menghapus data: ' + data.message, 'danger');
                }
            })
            .catch(error => {
                showToast('Error: ' + error.message, 'danger');
                console.error('Error deleting item:', error);
            });
        }
    };
    
    // Show toast notification
    function showToast(message, type = 'info') {
        toastMessage.textContent = message;
        
        // Set toast class based on type
        const toastElement = document.getElementById('toastNotification');
        toastElement.className = 'toast';
        toastElement.classList.add(`bg-${type === 'danger' ? 'danger' : type === 'success' ? 'success' : 'info'}`);
        toastElement.classList.add('text-white');
        
        toastNotification.show();
    }
    
    // Show loading state
    function showLoading() {
        itemsTableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </td>
            </tr>
        `;
    }
    
    // Hide loading state
    function hideLoading() {
        // Loading will be replaced by actual data
    }
});
