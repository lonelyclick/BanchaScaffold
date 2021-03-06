/*!
 *
 * Bancha Scaffolding Library
 * Copyright 2011-2014 codeQ e.U.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha.scaffold.samples
 * @copyright     Copyright 2011-2014 codeQ e.U.
 * @link          http://scaffold.bancha.io
 * @since         Bancha Scaffold v 0.5.1
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha Scaffold v PRECOMPILER_ADD_BANCHA_SCAFFOLD_RELEASE_VERSION
 *
 * For more information go to http://scaffold.bancha.io
 */

// init Ext.Direct Provider
Ext.syncRequire('Ext.direct.Manager');
Ext.direct.Manager.addProvider(Bancha.REMOTE_API);

// define the article model
Ext.define('Bancha.model.Article', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'direct',
        batchActions: false,
        api: {
            read    : Bancha.RemoteStubs.Article.read,
            create  : Bancha.RemoteStubs.Article.create,
            update  : Bancha.RemoteStubs.Article.update,
            destroy : Bancha.RemoteStubs.Article.destroy
        },
        reader: {
            type: 'json',
            root: 'data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            root: 'data'
        }
    },
    idProperty:'id',
    fields: [
        {
            name:'id',
            type:'int'
        },{
            name:'title',
            type:'string'
        },{
            name:'date',
            type:'date',
            dateFormat:'Y-m-d H:i:s'
        },{
            name:'body',
            type:'string'
        },{
            name:'published',
            type:'boolean'
        },{
            name:'user_id',
            type:'int'
        }
    ],
    validations: [
        {
            type:'presence',
            field:'title'
        },{
            type:'range',
            field:'user_id'
        }
    ],
    associations: [
        {
            type:'belongsTo',
            model:'Bancha.model.User',
            name:'user',
            foreignKey: 'user_id'
        }
    ]
});

// define the user model
Ext.define('Bancha.model.User', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'direct',
        batchActions: false,
        api: {
            read    : Bancha.RemoteStubs.User.read,
            create  : Bancha.RemoteStubs.User.create,
            update  : Bancha.RemoteStubs.User.update,
            destroy : Bancha.RemoteStubs.User.destroy
        },
        reader: {
            type: 'json',
            root: 'data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            root: 'data'
        }
    },
    idProperty: 'id',
    fields: [
        {
            name: 'id',
            type: 'int',
            text: 'ID'
        }, {
            name: 'name',
            type: 'string',
            text: '名称'
        }, {
            name: 'login',
            type: 'string',
            text: '登录状态'
        }, {
            name: 'created',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s',
            text: '创建时间'
        }, {
            name: 'email',
            type: 'string',
            text: '电子邮箱'
        }, {
            name: 'avatar',
            type: 'string',
            text: 'AVATAR'
        }, {
            name: 'weight',
            type: 'float',
            text: '体重'
        }, {
            name: 'height',
            type: 'int',
            text: '身高'
        }
    ],
    validations: [
        {
            type: 'presence',
            field: 'name'
        }, {
            type: 'length',
            field: 'name',
            min: 3,
            max: 64
        }, {
            type: 'presence',
            field: 'login'
        }, {
            type: 'length',
            field: 'login',
            min: 3,
            max: 64
        }, {
            type: 'format',
            field: 'login',
            matcher: /^[a-zA-Z0-9_]+$/ // alphanum regex
        }, {
            type: 'presence',
            field: 'email'
        }, {
            type: 'format',
            field: 'email',
            matcher: /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/ // email regex
        }, {
            type: 'range',
            field: 'weight',
            precision: 2
        }, {
            type: 'range',
            field: 'height',
            precision: 0,
            min: 50,
            max: 300
        }, {
            type: 'file', // todo should create a file upload field
            field: 'avatar',
            extension: ['gif', 'jpeg', 'png', 'jpg']
        }
    ],
    associations: [
        {
            type: 'hasMany',
            model: 'Bancha.model.Article',
            name: 'articles',
            foreignKey: 'user_id'
        }
    ]
});


// define book model (for management panel)
Ext.define('Bancha.model.Book', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'direct',
        batchActions: false,
        api: {
            read    : Bancha.RemoteStubs.Book.read
        },
        reader: {
            type: 'json',
            root: 'data',
            messageProperty: 'message'
        }
    },
    idProperty: 'id',
    fields: [
        {
            name:'id',
            type:'int'
        },{
            name:'title',
            type:'string'
        },{
            name:'published',
            type:'boolean'
        },{
            name:'user_id',
            type:'int'
        }
    ],
    validations: [
        {
            type:'presence',
            field:'title'
        },{
            type:'range',
            field:'user_id'
        }
    ],
    associations: [
        {
            type:'belongsTo',
            model:'Bancha.model.User',
            name:'user',
            foreignKey: 'user_id'
        }
    ]
});


// eof
