/*
 * Copyright 2010 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @toc {BBM} BBM Platform
 * @featureID blackberry.bbm.platform
 * @namespace Provides access to the BBM Social Platform.
 * 
 * <h1>Required BBM Version</h1>
 * 
 * BBM Social Platform APIs come with BBM6 and later. BBM6 is supported on BlackBerry OS 5, 6, and 7.
 * 
 * <h1>Authorization</h1>
 * 
 * <p>
 * Applications must first obtain access to the platform by calling
 * {@link blackberry.bbm.platform.register}.
 * </p>
 * 
 * <ul>
 * <li><b>Accessing other namespaces under</b> {@link blackberry.bbm.platform} <b>may throw exceptions
 * if not authorized.</b></li>
 * <li><b>Authorization may be revoked by the user or server at any time.</b></li>
 * </ul>
 * @BB50+
 * @learns {Download BBM SDK Resources} http://us.blackberry.com/developers/blackberrymessenger/ Download the resources required to use the BBM SDK for WebWorks [BlackBerry].
 * @learns {Getting Started Guide} http://docs.blackberry.com/en/developers/subcategories/?userType=21&category=BlackBerry+WebWorks+for+Smartphones Setup the BBM SDK for BlackBerry WebWorks [BlackBerry Developer Resource Center].
 * @learns {Sample Application Guide} http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/Getting-Started-BlackBerry-WebWorks-Development-for-Smartphones/ta-p/1185353 Get started with the sample application included with the BBM SDK for BlackBerry WebWorks [BlackBerry Developer Resource Center].
 */
blackberry.bbm.platform = {

    /**
     * @description Registers for access to BBM Platform.
     * <p>The application must assign a callback to {@link blackberry.bbm.platform.event:onaccesschanged}
     * before registering. During registration, a dialog will be shown to guide the user through the registration process.
     * The application should wait until {@link blackberry.bbm.platform.event:onaccesschanged} is invoked before continuing.</p>
     * <h4>Application in Test Environment</h4>
     * Applications must provide a UUID used to identify the application in the test
     * environment. If the application is in App World then the UUID will not be used. The same
     * UUID should be used for future releases of the same application; otherwise communication
     * between them will not be possible. The UUID must be a randomly generated 36-character UUID.
     * Any UUID generator can be used.
     * @param {Object} options Options.
     * @param {String} options.uuid ID used to identify the application in the test environment.
     * @throws {IllegalStateException} If <code>blackberry.bbm.platform.onaccesschanged</code> is not assigned.
     * @throws {IllegalArgumentException} If <code>UUID</code> is not a valid 36-character UUID.
     * @example
     * &lt;script type="text/javascript"&gt;
     * 
     * // Create callback invoked when access changes
     * blackberry.bbm.platform.onaccesschanged = function(accessible, status) {
     *     if (status == "allowed") {
     *         // Access allowed
     *     } else if (status == "user") {
     *         // Access blocked by user
     *     } else if (status == "rim") {
     *         // Access blocked by RIM
     *     }
     *     // Listen for other status...
     * };
     * 
     * // Register with the platform
     * blackberry.bbm.platform.register({
     *     uuid: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // Randomly generated UUID
     * });
     * 
     * &lt;/script&gt;
     * @BB50+
     */
    register : function(options) {
    },
    
    /**
     * @description Shows a dialog prompting the user to connect this application to BBM. This will
     * only work if the application is blocked by the user (i.e. access status is <code>"user"</code>).
     * <p>If the user decides to connect then the application should call {@link blackberry.bbm.platform.register}
     * to complete connecting this application to BBM.
     * @param {Function} onComplete Called when the user has finished connecting this application to BBM.
     * @param {Boolean} connected <code>true</code> if the user connected the application to BBM;
     * <code>false</code> otherwise.
     * @example
     * &lt;script type="text/javascript"&gt;
     * 
     * // Prompt the user to connect to BBM, and call register() if they do
     * blackberry.bbm.platform.requestUserPermission(function(allowed) {
     *     if(allowed) {
     *         // Register with the platform
     *         blackberry.bbm.platform.register({
     *             uuid: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // Randomly generated UUID
     *         });
     *     }
     * });
     * 
     * &lt;/script&gt;
     * @deprecated Use {@link blackberry.bbm.platform.showBBMAppOptions}
     * @BB50+
     */
    requestUserPermission : function(onComplete) {
        
    },
    
    /**
     * @description Brings the BBM options screen for this application to the foreground. This
     * method may only be called if access status is <code>"allowed"</code> or blocked by
     * <code>"user"</code>. Otherwise this method does nothing.
     * @param {Function} onComplete Called when the user exited the BBM options screen.
     * @example
     * &lt;script type="text/javascript"&gt;
     * 
     * blackberry.bbm.platform.requestAppSettings(function() {
     *     // User exited the BBM options screen
     * });
     * 
     * &lt;/script&gt;
     * 
     * @BB50+
     */
    showBBMAppOptions: function(onComplete) {
    	
    },

    /**
     * Called when the access status changes.
     * <p>This callback is mandatory and must be assigned <b>before</b> the call to {@link blackberry.bbm.platform.register}.
     * @param {Boolean} accessible <code>true</code> if access is allowed;
     * <code>false</code> otherwise.
     * @param {String} status The access status.
     * <ul>
     * <li><code>"allowed"</code>: Access is allowed.
     * <li><code>"user"</code>: Access is blocked by the user.
     * <li><code>"rim"</code>: Access is blocked by RIM (the application has most likely violated the terms of use).
     * <li><code>"itpolicy"</code>: Access is blocked by IT Policy.
     * <li><code>"resetrequired"</code>: Access is blocked because a device reset is required to use the BBM Social Platform.
     * <li><code>"nodata"</code>: Access is blocked because the device is out of data coverage. A data connection is required
     * to register the application.
     * <li><code>"temperror"</code>: Access is blocked because of a temporary error. The application should try to call
     * {@link blackberry.bbm.platform.register} in 30 minutes, or the next time the application starts.
     * <li><code>"nonuiapp"</code>: Access is blocked because {@link blackberry.bbm.platform.register} was called from a non-UI application.
     * <p>The application must initially register from a UI application because user interaction is required. The application may register from a background application only after the application has been connected in a UI application at least once.</li> 
     * </ul>
     * @event
     * @BB50+
     */
    onaccesschanged : function(accessible, status) {
    },
    
    /**
     * Called in certain cases when the application is invoked from within BBM.
     * <p>The <code>param</code> and <code>user</code> parameters are dictated by the invocation <code>reason</code>.
     * 
     * <p>This callback should be assigned <b>before</b> the call to {@link blackberry.bbm.platform.register}. If the application is not yet running then it will be launched. This callback will only be invoked once access to BBM Social Platform is allowed.
     * <p>This callback is optional. Applications are not required to handle this type of event. 
     * 
     * @param {String} reason The reason that the application was invoked.
     * <h4>Supported from BBM SDK 1.0</h4>
     * <ul>
     * <li><code>"profilebox"</code>: A user's profile box item was clicked. <code>param</code> is the {@link blackberry.bbm.platform.self.profilebox.ProfileBoxItem} that was clicked. See {@link blackberry.bbm.platform.self.profilebox}.
     * </ul>
     * <h4>Supported from BBM SDK 1.3</h4>
     * <ul>
     * <li><code>"profileboxtitle"</code>: A user's profile box title was clicked. <code>param</code> is <code>undefined</code>. See {@link blackberry.bbm.platform.self.profilebox}.
     * <li><code>"personalmessage"</code>: A user's personal message app link was clicked. <code>param</code> is the personal message, excluding the app link. See {@link blackberry.bbm.platform.self.setPersonalMessage}.
     * <li><code>"chatmessage"</code>: A user's chat message app link was clicked. <code>param</code> is <code>undefined</code>. See {@link blackberry.bbm.platform.users.startBBMChat}.
     * </ul>
     * @param {void} param The parameter associated with <code>reason</code>. May be <code>undefined</code>
     * @param {blackberry.bbm.platform.users.BBMPlatformUser | blackberry.bbm.platform.self} user The
     * user whose personal message/profile box/etc. was clicked. May be <code>undefined</code>. Always <code>undefined</code> prior to BBM SDK 1.3.
     * @example
     * &lt;script type="text/javascript"&gt;
     * 
     * blackberry.bbm.platform.onappinvoked = function(reason, param, user) {
     *     // User clicked a user's profile box
     *     if(reason == "profileboxtitle") {
     *         // e.g. Show detail for user's whole TPA profile box
     *         
     *     // User clicked a user's profile box item
     *     } else if(reason == "profilebox") {
     *         // e.g. Show the score and trophy represented by a profile box item
     *         var item = param;
     *         var score = item.cookie;
     *     
     *     // User clicked a user's personal message TPA link
     *     } else if(reason == "personalmessage") {
     *         // e.g. Allow the user to comment on the user's personal message in the user's TPA profile
     *         var personalMessage = param;
     *     
     *     // User clicked a contact's chat message TPA link
     *     } else if(reason == "chatmessage") {
     *         // e.g. Start an activity with the contact
     *         
     *     } 
     * }
     * 
     * &lt;/script&gt; 
     * @event
     * @BB50+
     */
    onappinvoked : function(reason, param, user) {
    },
    
    /**
     * The application environment.
     * <ul>
     * <li><code>"appworld"</code>: The application exists in App World.
     * <li><code>"test"</code>: The application does not exist in App World.
     * </ul>
     * @type String
     * @readOnly
     * @BB50+
     */
    environment : ""
};
