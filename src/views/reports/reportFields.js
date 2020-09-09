const reportFields = [
    { 
        key: 'no', 
        label: 'No', 
        sorter: false, 
        filter: false,
    },
    { 
        key: 'agency_name', 
        label: 'Nama Instansi Penyelenggara Negara / Nama Pejabat Pendaftaran', 
        sorter: true, 
        filter: true,
    },
    { 
        key: 'work_unit', 
        label: 'Sistem Elektronik / Satuan Kerja / Penanggung Jawab', 
        sorter: true, 
        filter: true,
    },
    { 
        key: 'information', 
        label: 'Keterangan', 
        sorter: true, 
        filter: true,
    },
    { 
        key: 'registration_progress', 
        label: 'Kondisi Progress Pendaftaran', 
        sorter: true, 
        filter: true,
    },
    { 
        key: 'regis_number', 
        label: 'No. Tanda Daftar', 
        sorter: true, 
        filter: true,
    },
    { 
        key: 'actions', 
        label: '',
        sorter: false,
        filter: false,
    }
]

export default reportFields;